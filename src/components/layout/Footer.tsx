import React from 'react';

function Footer() {
  return (
    <footer className="flex h-40 justify-center bg-kv-primary-blue p-4 text-white">
      <div className="mx-10 mt-6 flex h-[62px] w-[300px] flex-wrap items-center justify-center pc:h-5 pc:w-[1200px] pc:flex-row pc:justify-between tablet:mx-[110px] tablet:h-5 tablet:w-[1200px] tablet:flex-row tablet:justify-between">
        <span className="footer-link-style mr-3">@codeit - 2023</span>
        <div className="flex gap-[30px]">
          <a className="footer-link-style">Privacy Policy</a>
          <a className="footer-link-style">FAQ</a>
        </div>
        <div className="flex gap-3">
          <a href="https://facebook.com">
            <img
              src="/assets/icons/icon_facebook.svg"
              alt="Facebook"
              className="icon h-5 w-5 fill-current"
            />
          </a>
          <a href="https://twitter.com">
            <img
              src="/assets/icons/icon_twitter.svg"
              alt="Twitter"
              className="h-5 w-5"
            />
          </a>
          <a href="https://instagram.com">
            <img
              src="/assets/icons/icon_instagram.svg"
              alt="Instagram"
              className="h-5 w-5"
            />
          </a>
          <a href="https://youtube.com">
            <img
              src="/assets/icons/icon_youtube.svg"
              alt="YouTube"
              className="h-5 w-5"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
