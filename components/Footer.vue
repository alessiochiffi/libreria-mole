<template>
  <footer>
    <div class="container">
      <div class="row">
        <div class="col-md-4 address">
          <div class="logo"><img src="/logo.png" alt="" /></div>
          <h4>Bibliopop APS - Santa Maria delle Mole</h4>
          <h5>Via Ugo Bassi - Marino (RM)</h5>
        </div>

        <div class="col-md-8 col-informazioni">
          <h3 class="informazioni">Per info e per prenotare il tuo libro</h3>
          <ul>
            <li>Chiamaci al numero 340 9562661</li>
            <li>
              Oppure contattaci su Facebook
              <a
                target="_blank"
                href="https://it-it.facebook.com/Associazioneacabmarino/"
                >ACAB/BiblioPop APS Marino</a
              >
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>

<style lang="scss">
footer {
  padding: 70px 0;
  background: #f2f2f2;
  height: auto;
  margin-top: 100px;

  .logo img {
    position: relative;
    max-width: 100px;
  }

  .informazioni {
    margin-bottom: 10px;
  }
}

@media (max-width: 900px) {
  .address {
    text-align: center;
  }

  .col-informazioni {
    text-align: center;
    ul {
      list-style-type: none;
      padding: 0;
    }
  }
}
</style>
