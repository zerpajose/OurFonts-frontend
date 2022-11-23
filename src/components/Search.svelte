<script>
  import { openModal } from "svelte-modals";
  import Modal from "./Modal.svelte";

  import { getTokenUri } from "../lib/functions";
  import { metadataUri, loading } from "../stores/store";

  let metadataUriValue, loadingValue;

  metadataUri.subscribe((value) => (metadataUriValue = value));
  loading.subscribe((value) => (loadingValue = value));

  let valuegt2 = false;
  let value = "";
  let response = [];

  const handleClick = async (e) => {
    const fontInfo = e.target.value;

    const [id, name] = fontInfo.split(",");

    const tokenUri = await getTokenUri(id);

    metadataUri.set(tokenUri);

    console.log(`matadataUri: ${metadataUriValue}`);

    fetch(metadataUriValue)
      .then((response) => response.json())
      .then((data) => {
        const link = `<link href="${data.external_url}" rel="stylesheet" type="text/css">`;
        const style = `p { font-family: '${name}';}`;

        openModal(Modal, {
          title: name,
          message: [link, style],
        });
      });
  };

  const handleInput = (event) => (value = event.target.value);

  $: {
    if (value.length > 2) {
      loading.set(true);
      valuegt2 = true;
      fetch(`http://localhost:3000/sql/${value}`)
        .then((res) => res.json())
        .then((apiResponse) => {
          response = apiResponse || [];

          loading.set(false);
        })
        .catch((err) => console.log(`Error: ${err}`));
    } else {
      loading.set(false);
      valuegt2 = false;
    }
  }
</script>

<div class="row mt-4 mb-3">
  <div class="col" />
  <div class="col">
    <div class="input-group mb-3">
      <span class="input-group-text" id="searchfont">Search a font</span>
      <input
        type="text"
        {value}
        on:input={handleInput}
        class="form-control"
        placeholder="Search Fonts..."
        aria-label="searchlabel"
        aria-describedby="searchfont"
      />
    </div>
  </div>
  <div class="col" />
</div>

{#if loadingValue}
  <div class="spinner-border text-info" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>
{:else}
  <section>
    {#if !valuegt2}
      <div class="w-50 mx-auto alert alert-info" role="alert">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-info-circle"
          viewBox="0 0 16 16"
        >
          <path
            d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
          />
          <path
            d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"
          />
        </svg> <small>Search must have 3 letter or more.</small>
      </div>
    {:else}
      {#each response as item}
        <div class="card" style="width: 18rem;">
          <h1 class="card-img">{item[1]}</h1>
          <div class="card-body">
            <h5 class="card-title">N°{item[0]}</h5>
            <div class="card-text">
              <button on:click={handleClick} value={item}>Details</button>
            </div>
          </div>
        </div>
      {:else}
        <div class="w-50 mx-auto alert alert-info" role="alert">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-info-circle"
            viewBox="0 0 16 16"
          >
            <path
              d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
            />
            <path
              d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"
            />
          </svg> <small>No results.</small>
        </div>
      {/each}
    {/if}
  </section>
{/if}

<style>
  .card-img {
    border-style: solid;
    border-width: 1px;
    padding-top: 4rem;
    padding-bottom: 5rem;
  }
</style>
