<script>

  let fontName
  let fontFile

  const handleSubmit = () => {
    const formData  = new FormData();
    formData.append("name", fontName);
    formData.append("file", fontFile[0]);

    fetch('http://localhost:3000/fonts', {
      method: "POST",
      body: formData,
    }).then(response => response.json())
      .then(data => {
        console.log(data)
      })
      .catch(error => {
        console.log(error);
      })
  }

</script>

<div class="row">
  <div class="col"></div>
  <div class="col mx-auto">

    <form action="/fonts" method="post">
      <h2 class="my-5">Upload a Font</h2>
      <div class="input-group mb-3">
        <span class="input-group-text" id="basic-addon1">Font Name</span>
        <input bind:value={fontName} type="text" class="form-control" placeholder="Name" aria-label="Name" aria-describedby="basic-addon1">
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
        <button on:click|preventDefault={handleSubmit} class="btn btn-primary mb-3">Upload Font</button>
      </div>
    </form>
  </div>
  <div class="col"></div>
</div>