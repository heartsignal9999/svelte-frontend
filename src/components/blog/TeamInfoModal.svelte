<!-- src/components/blog/TeamInfoModel.svelte -->
<script lang="ts">
  import { teamInfoModal } from '../../stores/blogStores';
  let teamMembers = [
    {
      name: "Dong-Hee Lee",
      role: "Deep Learning Model Development Lead",
      description: "IBS Center for Neuroscience Imaging Research, M.S. in Biomedical Engineering",
      github: "https://github.com/leedh/",
    },
    {
      name: "Myung-jun Lee",
      role: "Data Preprocessing, Backend Development",
      description: "KDT AI Research Course, B.S. in Chemistry Engineering",
      github: "https://github.com/Chancecatch1",
    },
    {
      name: "Jung-hyun Kim",
      role: "Web Frontend Development, Service Deployment",
      description: "KDT AI Research Course, M.S. in Education Science",
      github: "https://github.com/seoulcity",
    },
    // ... Add the other team members here in a similar structure
  ];
</script>

<main>
  {#if $teamInfoModal}
  <div class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
    <div class="bg-white rounded p-8 shadow-lg text-black">
      <h2 class="text-lg font-bold mb-4">Introduction of HeartSignal Team</h2>
      <ul>
        {#each teamMembers as member}
          <li class="mb-4">
            <div class="font-bold">{member.name}</div>
            <div class="text-sm">{member.role}</div>
            <div class="text-xs">{member.description}</div>
            <a class="text-xs hover:font-semibold hover:text-blue-500" href="{member.github}" target="_blank">{member.github}</a>
          </li>
        {/each}
      </ul>
      <button class="mt-4" on:click={() => teamInfoModal.set(false)}>Close</button>
    </div>
  </div>
{/if}
</main>
