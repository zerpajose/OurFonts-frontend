<script>
  import { mintNFTFont } from "../lib/functions";
  import { cssUri, metadataUri, loading } from "../stores/store";

  let fontName, fontFile, cssUriValue, metadataUriValue, loadingValue;

  cssUri.subscribe((value) => (cssUriValue = value));
  metadataUri.subscribe((value) => (metadataUriValue = value));
  loading.subscribe((value) => (loadingValue = value));

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("name", fontName);
    formData.append("file", fontFile[0]);

    fetch("http://localhost:3000/fonts", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then(async (data) => {
        cssUri.set(data.cid_css_file);
        metadataUri.set(data.cid_metadata_file);
        // mintear
        const { tokenId, txHash } = await mintNFTFont(
          `https://${metadataUriValue}.ipfs.nftstorage.link`
        );
        console.log(`tokenId just minted: ${tokenId}`);
        console.log(`txHash just minted: ${txHash}`);

        fetch("http://localhost:3000/sql", {
          method: "POST",
          body: JSON.stringify({ id: tokenId, name: data.name }),
        }).then((response) => response.json())
        .then((data) =>{
          console.log(`tableland txHash: ${data.txHash}`);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
</script>

{#if loadingValue}
<div class="spinner-border text-info" role="status">
  <span class="visually-hidden">Loading...</span>
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
        <label class="input-group-text" for="inputGroupFile01">Font File</label>
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
  </div>
  <div class="col" />
</div>
{/if}
