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
  import { onMount } from "svelte";

  onMount(() => {
    document.title = 'HeartSignal - Listen to Your Heart';
  });
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
      <div>HeartSignal is in beta testing.</div>
      <div>Saved recordings will be stored until April 15th, 2024, and then deleted.</div>
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