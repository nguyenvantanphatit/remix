import { EmailIcon, EmailShareButton, FacebookIcon, FacebookShareButton, WhatsappIcon, WhatsappShareButton } from 'react-share';
const ShareButtons = ({ shareUrl }: { shareUrl: string }) => {
  return (
    <div className='flex justify-center items-center mt-2'>
      <div className='px-2'>
        <FacebookShareButton url={shareUrl}>
          <FacebookIcon size={32} round />
        </FacebookShareButton>
      </div>
      <div className='px-2'>
        <EmailShareButton url={shareUrl}>
          <EmailIcon size={32} round />
        </EmailShareButton>
      </div>
      <div className='px-2'>
        <WhatsappShareButton url={shareUrl}>
          <WhatsappIcon size={32} round />
        </WhatsappShareButton>
      </div>
    </div>
  );
};

export default ShareButtons;
