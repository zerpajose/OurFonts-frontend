<script>
  import { mintNFTFont } from "../lib/functions";
  import { cssUri, metadataUri, loading } from "../stores/store";

  let fontName,
    fontFile,
    txHashMint,
    loadingApproveTX = false,
    loadingUploadingIPFS = false,
    onSuccess = false;
  let cssUriValue, metadataUriValue, loadingValue;

  cssUri.subscribe((value) => (cssUriValue = value));
  metadataUri.subscribe((value) => (metadataUriValue = value));
  loading.subscribe((value) => (loadingValue = value));

  const handleSubmit = (e) => {
    loadingUploadingIPFS = true;

    const formData = new FormData();
    formData.append("name", fontName);
    formData.append("file", fontFile[0]);

    fontName = "";
    fontFile = [];

    fetch("http://localhost:3000/fonts", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then(async (data) => {
        cssUri.set(data.cid_css_file);
        metadataUri.set(data.cid_metadata_file);

        loadingUploadingIPFS = false;

        loadingApproveTX = true
        const { tokenId, txHash } = await mintNFTFont(
          `https://${metadataUriValue}.ipfs.nftstorage.link`
        );

        txHashMint = txHash;

        fetch("http://localhost:3000/sql", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: tokenId, name: data.name }),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(`tableland txHash: ${data.txHash}`);
            onSuccess = true;
            loadingApproveTX = false
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };
</script>

{#if loadingApproveTX}
  <div class="mt-3 w-50 mx-auto alert alert-info" role="alert">
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
    </svg>
    <small class="d-block">Please, approve transaction in your wallet and wait for confirmation.</small>
    <small class="d-block">Please do not close or refresh browser.</small>
  </div>
  <div class="spinner-border text-info" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>
{:else if loadingUploadingIPFS}
  <div class="mt-3 w-50 mx-auto alert alert-info" role="alert">
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
    </svg>
    <small>Please wait while we are:</small>
    <small class="d-block">
      Uploading your Font file to IPFS
      <div class="spinner-border text-info" role="status"><span class="visually-hidden">Loading...</span></div>
    </small>
    <small class="d-block">
      Uploading CSS file to IPFS
      <div class="spinner-border text-info" role="status"><span class="visually-hidden">Loading...</span></div>
    </small>
    <small class="d-block">
      Uploading NFT metadata file to IPFS
      <div class="spinner-border text-info" role="status"><span class="visually-hidden">Loading...</span></div>
    </small>
  </div>
{:else}
  <div class="row">
    <div class="col" />
    <div class="col mx-auto">
      <form action="/fonts" method="post">
        <h2 class="my-5">Upload a Font</h2>
        <div class="input-group mb-3">
          <span class="input-group-text" id="basic-addon1">Font Name</span>
          <input
            bind:value={fontName}
            type="text"
            class="form-control"
            placeholder="Name"
            aria-label="Name"
            aria-describedby="basic-addon1"
          />
        </div>
        <div class="input-group mb-3">
          <label class="input-group-text" for="inputGroupFile01"
            >Font File</label
          >
          <input
            type="file"
            accept=".ttf, .otf, .woff, .woff2"
            bind:files={fontFile}
            class="form-control"
            id="inputGroupFile01"
          />
        </div>
        <div class="col-auto">
          <button
            on:click|preventDefault={handleSubmit}
            class="btn btn-primary mb-3">Upload Font</button
          >
        </div>
      </form>
      {#if onSuccess}
        <div class="alert alert-info alert-dismissible fade show" role="alert">
          <strong>Font Uploaded & Minted</strong>
          <p>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://mumbai.polygonscan.com/tx/{txHashMint}"
              >See transaction</a
            >
          </p>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
          />
        </div>
      {/if}
    </div>
    <div class="col" />
  </div>
{/if}
