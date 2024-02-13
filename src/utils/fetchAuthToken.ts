// src/utils/fetchAuthToken.ts
export async function fetchAuthToken() {
    try {
      const endpoint =
        "https://asia-northeast3-heartsignal-webapp.cloudfunctions.net/wav-to-img-upload";
      const audience = endpoint;

      // fetch 요청을 POST로 변경
      const tokenResponse = await fetch("/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded", // 적절한 Content-Type 헤더 추가
        },
        body: `endpoint=${encodeURIComponent(
          endpoint
        )}&audience=${encodeURIComponent(audience)}`, // body 데이터 추가
      });

      if (!tokenResponse.ok) throw new Error("Failed to fetch auth token");

      const tokenData = await tokenResponse.json();
      return tokenData;
    } catch (error) {
      console.error("Error fetching auth token:", error);
      throw error;
    }
  }