import { createClient } from
    "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const SUPABASE_URL =
    "https://caiwevonprcmeuqsadpz.supabase.co";

const SUPABASE_KEY =
    "sb_publishable_G1HcaBNAoS9z4Q2gGw5nbQ_g6uukaBW";

export const supabase =
    createClient(
        SUPABASE_URL,
        SUPABASE_KEY
    );