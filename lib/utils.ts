import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import pocketbaseEnv from "@/utils/pocketbase.env"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Generate a proper URL for a PocketBase file
 * @param collectionId - The ID of the collection containing the record
 * @param recordId - The ID of the record
 * @param filename - The filename of the file
 * @returns The complete URL to access the file, or empty string if filename is invalid
 */
export function getPocketBaseFileUrl(collectionId: string, recordId: string, filename: string): string {
  if (!filename || !collectionId || !recordId) return ''
  return `${pocketbaseEnv.pocketbase.url}/api/files/${collectionId}/${recordId}/${filename}`
}
