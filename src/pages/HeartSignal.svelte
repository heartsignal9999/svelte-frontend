<!-- src/Pages/HeartSignal.svelte -->
<script lang="ts">
  import Modal from "../components/Modal.svelte";
  import RecordButton from "../components/RecordButton.svelte";
  import UploadButton from "../components/UploadButton.svelte";
  import AnalyzeButton from "../components/AnalyzeButton.svelte";
  import ResultContainer from "../components/ResultContainer.svelte";
  import StatusText from "../components/StatusText.svelte";
  import UseInstruction from "../components/UseInstruction.svelte";
  import Nav from "../components/Nav.svelte";
</script>

<main class="flex flex-col text-center min-h-screen bg-gray-100 px-4 pt-6">
  <div class="container max-w-md mx-auto mb-8"> <!-- Increased bottom margin -->
    <Nav />
  </div>
  <div class="container max-w-md mx-auto items-center"> 
    <div class="text-xl font-semibold mb-6">
      <div>Record & Analyze</div>
      <div>Your ❤️ Sounds</div>
    </div> 

    <div class="text-sm text-gray-600 mb-4">
      <!-- <div>Heart Signal is currently in beta testing.</div> -->
      <!-- <div>Your recordings will be stored in the cloud and retained until March 30th for testing purposes.</div> -->
      <div>현재 하트시그널은 베타테스트 중입니다.</div>
      <div>녹음 파일은 4월 15일까지 보관 후 삭제됩니다.</div>
    </div>

    <div class="bg-white rounded-lg shadow-md p-6 mb-8">
      <UseInstruction /> 
      <ResultContainer />
      <StatusText />

      <div class="flex justify-center mt-4"> 
        <RecordButton /> 
        <UploadButton />   
      </div>
      <div class="flex justify-center mt-4">
        <AnalyzeButton />
      </div>
    </div>

    <Modal /> 
  </div>
</main>