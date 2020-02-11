import React from "react"

const Footer = props => (
  <footer class="footer">
    <div class="row align-items-center justify-content-xl-between">
      <div class="col-xl-6">
        <div class="copyright text-center text-xl-left text-muted">
          © {(new Date()).getFullYear()} <a href="/" class="font-weight-bold ml-1" target="_blank">EMAQ/00289/2014</a>
        </div>
      </div>
    </div>
  </footer>
)

export default Footer