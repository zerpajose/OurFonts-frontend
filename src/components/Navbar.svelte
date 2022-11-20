<script>
  import { activeTab } from "../stores/store";
  export let address

  let activeTabValue;

	activeTab.subscribe(value => {activeTabValue = value})

  const onChangeTab = (e) => {
    activeTab.set(e.target.hash)
  }

</script>

<nav class="navbar navbar-expand-lg bg-light">
  <div class="container-fluid">

    <a class="navbar-brand" href="www.example.org">
      <img src="/src/assets/crypto-devs.svg" alt="Bootstrap" width="30" height="24">
    </a>

    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
      <li class="nav-item">
        <a on:click={onChangeTab} class="nav-link" aria-current="page" href="#search">Search</a>
      </li>
      <li class="nav-item">
        <a on:click={onChangeTab} class="nav-link" href="#upload">Upload</a>
      </li>
    </ul>
    <div class="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
      <h4 class="badge bg-secondary">
        <span class="badge bg-light text-dark">Address</span> {address.slice(0, 5)}...{address.slice(-4)}
      </h4>
    </div>
  </div>
</nav>