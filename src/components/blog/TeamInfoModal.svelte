<!-- src/components/blog/TeamInfoModel.svelte -->
<script lang="ts">
  import { teamInfoModal } from '../../stores/blogStores';
  let teamMembers = [
    {
      name: "이동희",
      role: "모델 개발, 팀 리드",
      description: "기초과학연구원 뇌과학 이미징 연구단 소속 연구원",
      background: "성균관대 바이오메디컬공학 석사",
    },
    {
      name: "이명준",
      role: "모델 개발, 데이터 전처리",
      description: "KDT AI 리서치 과정, AI사물인터넷(AIoT)과정 수료",
      background: "숭실대 화학공학 학사",
    },
    {
      name: "김정현",
      role: "웹앱, 프론트엔드 개발",
      description: "KDT AI 리서치 과정, 42서울 본과정 수료",
      background: "서울대학교 교육학 학사, 석사(성인학습, 기술교육)",
    },
    // ... Add the other team members here in a similar structure
  ];
</script>

<main>
  {#if $teamInfoModal}
  <div class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
    <div class="bg-white rounded p-8 shadow-lg text-black">
      <h2 class="text-lg font-bold mb-4">하트시그널 팀 소개</h2>
      <ul>
        {#each teamMembers as member}
          <li class="mb-4">
            <div class="font-bold">{member.name}</div>
            <div class="text-sm">{member.role}</div>
            <div class="text-xs">{member.description}</div>
            <div class="text-xs">{member.background}</div>
          </li>
        {/each}
      </ul>
      <button class="mt-4" on:click={() => teamInfoModal.set(false)}>Close</button>
    </div>
  </div>
{/if}
</main>
