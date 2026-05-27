import { createClient } from "../lib/supabase/client";

export default async function fetchEvents() {
    const supabase = createClient();
    const { data, error } = await supabase
          .from("event")
          .select(`
            *,
            event_categories (
              category (
                id,
                category
              )
            )
          `)
          .order("created_at", { ascending: true });

          if (error) {
            throw new Error(error.message);
          }

          return data;
}