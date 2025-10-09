import { db } from "./db";
import { users } from "@shared/schema";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";

async function initAdmin() {
  try {
    const username = "nomun";
    const password = "969908";

    const existingUser = await db.select().from(users).where(eq(users.username, username));

    if (existingUser.length > 0) {
      console.log("관리자 계정이 이미 존재합니다.");
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.insert(users).values({
      username,
      password: hashedPassword,
    });

    console.log("관리자 계정이 성공적으로 생성되었습니다.");
    console.log(`아이디: ${username}`);
    console.log(`비밀번호: ${password}`);
    
    process.exit(0);
  } catch (error) {
    console.error("관리자 계정 생성 중 오류 발생:", error);
    process.exit(1);
  }
}

initAdmin();
