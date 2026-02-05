import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

/**
 * Format a date as relative time (e.g., "2 months ago", "3 years ago")
 * @param date - Date to format
 * @returns Relative time string
 */
export function getRelativeTime(date: Date): string {
	return dayjs(date).fromNow();
}

/**
 * Format a date as full date string (e.g., "January 31, 2022")
 * @param date - Date to format
 * @returns Formatted date string
 */
export function getFormattedDate(date: Date): string {
	return dayjs(date).format('MMMM D, YYYY');
}

/**
 * Format a date as short date (e.g., "Jan 31, 2022")
 * @param date - Date to format
 * @returns Short formatted date string
 */
export function getShortDate(date: Date): string {
	return dayjs(date).format('MMM D, YYYY');
}
