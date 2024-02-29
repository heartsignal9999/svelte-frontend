<!-- src/Pages/Home.svelte -->
<script lang="ts">
  import { push } from "svelte-spa-router";
  import { API_ENDPOINTS } from "../config/apiConfig";
  import { onMount } from "svelte";

  function navigateToHeartSignal() {
    push("/heartsignal");
  }

  async function uploadCheck() {
  try {
    const fetchPromises = [
      fetch(API_ENDPOINTS.uploadAudio, { method: "GET" }),
      fetch(API_ENDPOINTS.processAudio, { method: "GET" }),
      fetch(API_ENDPOINTS.inferHasMurmur, { method: "GET" }),
      fetch(API_ENDPOINTS.inferIsHeartsound, { method: "GET" }),
      fetch(API_ENDPOINTS.inferSegment, { method: "GET" }),
    ];

    // Promise.all을 사용하여 모든 fetch 요청을 동시에 실행
    const responses = await Promise.all(fetchPromises);

    // 필요한 경우, 여기에서 responses 배열을 이용하여 각 응답을 처리
  } catch (error) {
    console.error(
      "There has been a problem with your fetch operation:",
      error
    );
    throw error; // 오류를 다시 발생시켜 호출자에게 전달
  }
}
  onMount(() => {
    uploadCheck(); // 컴포넌트가 마운트될 때 uploadCheck 호출
  });
</script>

  <main class="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-pink-400 to-blue-500 text-white text-center px-4">
    <div>
      <h1 class="text-5xl font-bold mb-2">Heart Signal</h1>
      <!-- <p class="text-2xl mb-6">Listen to the rhythm of your heart ❤️</p> -->
      <p class="text-xl mb-6">당신의 심장❤️에 귀기울여보세요</p>

      <button on:click={navigateToHeartSignal} 
              class="bg-white text-pink-500 py-3 px-6 text-xl font-semibold rounded-full shadow-md hover:bg-opacity-80 transition-colors">
        시작하기
      </button>
    </div>  
</main>
