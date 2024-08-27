import FacebookIcon from '@/assets/icons/icon_facebook.svg';
import InstagramIcon from '@/assets/icons/icon_instagram.svg';
import TwitterIcon from '@/assets/icons/icon_twitter.svg';
import YoutubeIcon from '@/assets/icons/icon_youtube.svg';

function Footer() {
  return (
    <footer className="flex h-40 justify-center bg-kv-primary-blue p-4 text-white">
      <div className="mx-0 mt-6 flex h-[62px] w-[300px] flex-wrap items-center justify-center pc:h-5 pc:w-[1200px] pc:flex-row pc:justify-between tablet:mx-[110px] tablet:h-5 tablet:w-[1200px] tablet:flex-row tablet:justify-between">
        <span className="footer-link-style mr-3">@codeit - 2024</span>
        <div className="flex gap-[30px]">
          <a className="footer-link-style">Privacy Policy</a>
          <a className="footer-link-style">FAQ</a>
        </div>
        <div className="flex gap-3">
          <a href="https://facebook.com">
            <FacebookIcon />
          </a>
          <a href="https://twitter.com">
            <TwitterIcon />
          </a>
          <a href="https://instagram.com">
            <InstagramIcon />
          </a>
          <a href="https://youtube.com">
            <YoutubeIcon />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
