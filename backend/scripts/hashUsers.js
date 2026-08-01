import { supabase } from "../config/supabase.js";
import { hashPassword } from "../utils/hash.js";

async function hashExistingUsers() {

    console.log("🚀 Starting Password Migration...\n");

    const { data: users, error } = await supabase
        .from("users")
        .select("*");

    if (error) {
        console.error(error);
        return;
    }

    for (const user of users) {

        if (user.password.startsWith("$2b$")) {
            console.log(`⏭ ${user.email} already hashed`);
            continue;
        }

        const hashedPassword = await hashPassword(user.password);

        const { error: updateError } = await supabase
            .from("users")
            .update({
                password: hashedPassword
            })
            .eq("id", user.id);

        if (updateError) {
            console.log(`❌ Failed: ${user.email}`);
            console.log(updateError);
        } else {
            console.log(`✅ Updated: ${user.email}`);
        }

    }

    console.log("\n🎉 Password Migration Complete!");
}

hashExistingUsers();