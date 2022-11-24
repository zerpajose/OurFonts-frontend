<script>
  import { closeModal } from "svelte-modals";
  import { metadataUri, cssUri } from "../stores/store";

  export let isOpen;

  export let title;
  export let message;

  let cssUriValue;
  let metadataUriValue;
  let test = 'Test the font';

  let linktag_code = message[0].split(" ");
  let css_code = message[1].split("\n");

  let html_comment = '<!-- index.html -->';
  let css_comment = '/* styles.css */';
  

  cssUri.subscribe((value) => cssUriValue = value );
  metadataUri.subscribe((value) => metadataUriValue = value );

  fetch(`${metadataUriValue}`)
    .then((res) => res.json())
    .then((apiResponse) => {
      cssUriValue = apiResponse.external_url;
    })
    .catch((err) => console.log(`Error: ${err}`));
</script>

<svelte:head>
  <link rel="stylesheet" type="text/css" href={message[2]} >
</svelte:head>

{#if isOpen}
  <div role="dialog" class="modal">
    <div class="contents">
      <h1 style="font-family: '{title}';">{title}</h1>
      <code class="codes py-2 px-3">
        <p class="text-start">{html_comment}</p>
        <p class="text-start mb-0">{linktag_code[0]}</p>
        <p class="text-start mb-0">&nbsp;&nbsp;{linktag_code[1]}</p>
        <p class="text-start mb-0">&nbsp;&nbsp;{linktag_code[2]}</p>
        <p class="text-start mb-0">&nbsp;&nbsp;{linktag_code[3]}</p>
        <p class="text-start mb-0">{linktag_code[4]}</p>
      </code>
      <code class="codes py-2 px-3">
        <p class="text-start">{css_comment}</p>
        <p class="text-start mb-0">{css_code[0]}</p>
        <p class="text-start mb-0">&nbsp;&nbsp;{css_code[1]}</p>
        <p class="text-start mb-0">{css_code[2]}</p>
      </code>

      <div class="border border-1">
        <input class="mt-5" bind:value={test}>
        <h1 style="font-family: '{title}';" class="mt-5">{test}</h1>
      </div>

      <div class="actions">
        <button on:click={closeModal}>OK</button>
      </div>
    </div>
  </div>
{/if}

<style>
  .codes{
    background-color: #333;
    color: white;
    font-weight: bold;
  }
  .modal {
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;

    /* allow click-through to backdrop */
    pointer-events: none;
  }

  .contents {
    min-width: 240px;
    border-radius: 6px;
    padding: 16px;
    background: white;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    pointer-events: auto;
  }

  code {
    text-align: center;
    margin-top: 16px;
  }

  .actions {
    margin-top: 32px;
    display: flex;
    justify-content: flex-end;
  }
</style>
