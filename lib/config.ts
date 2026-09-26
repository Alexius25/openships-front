import { loadEnvConfig } from '@next/env'
 
const projectDir = process.cwd()
loadEnvConfig(projectDir)

export const API_URL = process.env.API_URL || "http://192.168.0.137:5018";

export const sharpTextFontSettings = {
    sdf: true,
    fontSize: 256,
    buffer: 16,
    radius: 24,
    cutoff: 0.2,
    smoothing: 0.4,
};

export const VESSELS_MAX_AGE_MINUTES = Number(process.env.VESSELS_MAX_AGE_MINUTES) || 60;
