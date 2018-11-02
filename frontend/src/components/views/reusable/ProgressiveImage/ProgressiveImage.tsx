import * as React from 'react';
import ReactProgressiveImage from 'react-progressive-image';
import './ProgressiveImage.css';
import classNames from 'classnames';

interface IProps {
  placeholder: string;
  src: string;
  imgProps?: React.HTMLProps<HTMLImageElement>;
}

const ProgressiveImage: React.SFC<IProps> = (props: IProps) => {
  return (
    <ReactProgressiveImage
      placeholder={props.placeholder}
      src={props.src}
    >
      {(src: string, loading: boolean) => (
        <img
          src={src}
          alt="an image"
          {...props.imgProps as any}
          className={classNames(
            (props.imgProps && props.imgProps.className),
            'ProgressiveImage-placeholder',
            { 'ProgressiveImage-src': !loading }
          )}
        />
      )}
    </ReactProgressiveImage>
  );
};

export default ProgressiveImage;
