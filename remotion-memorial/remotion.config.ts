import { Config } from "@remotion/cli/config";

// Serve media directly from the project root (parent folder).
// `staticFile('תמונות/...')` resolves to ../תמונות/...
// Remotion caches the bundle, so the initial public-dir copy happens once.
Config.setPublicDir("../");
Config.setVideoImageFormat("jpeg");
Config.setOverwriteOutput(true);
Config.setConcurrency(2);
