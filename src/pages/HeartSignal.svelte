<!-- src/Pages/HeartSignal.svelte -->
<script lang="ts">
  import Modal from "../components/Modal.svelte";
  import RecordButton from "../components/RecordButton.svelte";
  import AnalyzeButton from "../components/AnalyzeButton.svelte";
  import ResultContainer from "../components/ResultContainer.svelte";
  import StatusText from "../components/StatusText.svelte";
  import UseInstruction from "../components/UseInstruction.svelte";

</script>

<main class="flex flex-col justify-between items-center min-w-[320px] min-h-screen bg-[#242424] text-white dark:bg-white dark:text-[#213547] px-4">
  <div class="flex-grow flex justify-center items-center">
    <div class="text-center">
      <div class="text-4xl font-bold my-5">
        심음(heart sound) 녹음 & 분석
      </div>
      <div>현재 하트시그널은 베타테스트 중입니다.</div>
      <div>녹음하신 파일은 클라우드에 저장되며,</div>
      <div>테스트 기간(~2월 20일) 동안 보유됩니다.</div>
    </div>
  </div>

  <UseInstruction />
  <ResultContainer />
  <StatusText />
  <Modal />
  
  <div class="flex justify-center w-full">
    <RecordButton />
    <AnalyzeButton />
  </div>
</main>

