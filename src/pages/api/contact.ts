import type { APIRoute } from 'astro';

export const prerender = false;

interface ContactFormData {
	name: string;
	email: string;
	phone?: string;
	subject: string;
	message: string;
	'cf-turnstile-response'?: string;
}

interface TurnstileResponse {
	success: boolean;
	'error-codes'?: string[];
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Validate Turnstile token with Cloudflare's siteverify API. */
async function verifyTurnstile(
	token: string,
	secretKey: string,
	remoteIp: string | null,
): Promise<TurnstileResponse> {
	const formData = new FormData();
	formData.append('secret', secretKey);
	formData.append('response', token);
	if (remoteIp) {
		formData.append('remoteip', remoteIp);
	}

	const response = await fetch(
		'https://challenges.cloudflare.com/turnstile/v0/siteverify',
		{ method: 'POST', body: formData },
	);

	return response.json() as Promise<TurnstileResponse>;
}

/** Escape HTML to prevent injection in email body. */
function escapeHtml(str: string): string {
	return str
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;');
}

export const POST: APIRoute = async ({ request, locals }) => {
	const env = locals.runtime.env;

	// Parse request body
	let body: ContactFormData;
	try {
		body = await request.json();
	} catch {
		return jsonResponse({ success: false, error: 'Invalid request body.' }, 400);
	}

	const { name, email, phone, subject, message } = body;

	// Validate required fields
	if (!name?.trim()) {
		return jsonResponse({ success: false, error: 'Name is required.' }, 400);
	}
	if (!email?.trim() || !EMAIL_REGEX.test(email)) {
		return jsonResponse({ success: false, error: 'A valid email address is required.' }, 400);
	}
	if (!subject?.trim()) {
		return jsonResponse({ success: false, error: 'Subject is required.' }, 400);
	}
	if (!message?.trim()) {
		return jsonResponse({ success: false, error: 'Message is required.' }, 400);
	}

	// Turnstile verification — skip if secret key is not configured (local dev)
	const turnstileSecret = env.TURNSTILE_SECRET_KEY;
	if (turnstileSecret) {
		const token = body['cf-turnstile-response'];
		if (!token) {
			return jsonResponse({ success: false, error: 'Please complete the verification challenge.' }, 400);
		}

		const remoteIp = request.headers.get('CF-Connecting-IP');
		const result = await verifyTurnstile(token, turnstileSecret, remoteIp);

		if (!result.success) {
			console.error('Turnstile verification failed:', result['error-codes']);
			return jsonResponse({ success: false, error: 'Verification failed. Please try again.' }, 403);
		}
	}

	// Build and send email
	try {
		const htmlBody = `
			<div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; color: #333;">
				<h2 style="color: #234030; border-bottom: 2px solid #f97316; padding-bottom: 8px;">
					New Contact Form Submission
				</h2>
				<table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
					<tr>
						<td style="padding: 8px 12px; font-weight: bold; color: #234030; width: 120px;">Name</td>
						<td style="padding: 8px 12px;">${escapeHtml(name.trim())}</td>
					</tr>
					<tr style="background-color: #f9f9f9;">
						<td style="padding: 8px 12px; font-weight: bold; color: #234030;">Email</td>
						<td style="padding: 8px 12px;">
							<a href="mailto:${escapeHtml(email.trim())}" style="color: #f97316;">${escapeHtml(email.trim())}</a>
						</td>
					</tr>
					${phone?.trim() ? `
					<tr>
						<td style="padding: 8px 12px; font-weight: bold; color: #234030;">Phone</td>
						<td style="padding: 8px 12px;">${escapeHtml(phone.trim())}</td>
					</tr>
					` : ''}
					<tr style="background-color: #f9f9f9;">
						<td style="padding: 8px 12px; font-weight: bold; color: #234030;">Subject</td>
						<td style="padding: 8px 12px;">${escapeHtml(subject.trim())}</td>
					</tr>
				</table>
				<div style="margin-top: 20px; padding: 16px; background-color: #f5f5f5; border-left: 4px solid #f97316; border-radius: 4px;">
					<p style="margin: 0 0 8px; font-weight: bold; color: #234030;">Message</p>
					<p style="margin: 0; white-space: pre-wrap; line-height: 1.6;">${escapeHtml(message.trim())}</p>
				</div>
				<p style="margin-top: 24px; font-size: 12px; color: #999;">
					Sent from the contact form at marsamtherapy.com
				</p>
			</div>
		`;

		const plainText = [
			`New Contact Form Submission`,
			``,
			`Name: ${name.trim()}`,
			`Email: ${email.trim()}`,
			phone?.trim() ? `Phone: ${phone.trim()}` : null,
			`Subject: ${subject.trim()}`,
			``,
			`Message:`,
			message.trim(),
			``,
			`---`,
			`Sent from the contact form at marsamtherapy.com`,
		].filter(Boolean).join('\n');

		const emailPayload = {
			from: 'noreply@marsamtherapy.com',
			to: 'contact@marsamtherapy.com',
			subject: `[Marsam Therapy] ${subject.trim()}`,
			replyTo: email.trim(),
			html: htmlBody,
			text: plainText,
		};

		if (env.CONTACT_EMAIL) {
			await env.CONTACT_EMAIL.send(emailPayload);
		} else {
			// Local dev — send_email binding not available, log instead
			console.log('[DEV] Email would be sent:', JSON.stringify(emailPayload, null, 2));
		}

		return jsonResponse({ success: true });
	} catch (error) {
		console.error('Failed to send email:', error);
		return jsonResponse(
			{ success: false, error: 'Failed to send your message. Please try again later.' },
			500,
		);
	}
};

/** Only allow POST requests. */
export const ALL: APIRoute = () => {
	return new Response(JSON.stringify({ success: false, error: 'Method not allowed.' }), {
		status: 405,
		headers: {
			'Content-Type': 'application/json',
			Allow: 'POST',
		},
	});
};

function jsonResponse(data: Record<string, unknown>, status = 200): Response {
	return new Response(JSON.stringify(data), {
		status,
		headers: { 'Content-Type': 'application/json' },
	});
}
