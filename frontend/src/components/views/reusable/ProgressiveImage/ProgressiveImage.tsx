import * as React from 'react';
import ReactProgressiveImage from 'react-progressive-image';
import './ProgressiveImage.css';
import classNames from 'classnames';

interface IProps {
  placeholder: string;
  src: string;
  imgProps?: React.HTMLProps<HTMLImageElement>;
}

class ProgressiveImage extends React.Component<IProps> {
  private loadingHasBeenThere: boolean = false;

  public render() {
    return (
      <ReactProgressiveImage
        placeholder={this.props.placeholder}
        src={this.props.src}
      >
        {(src: string, loading: boolean) => {
          if (loading) {
            this.loadingHasBeenThere = true;
          }

          return (
            <img
              src={src}
              alt="an image"
              {...this.props.imgProps as any}
              className={classNames(
                (this.props.imgProps && this.props.imgProps.className),
                {'ProgressiveImage-placeholder': this.loadingHasBeenThere},
                {'ProgressiveImage-src': !loading}
              )}
            />
          );
        }}
      </ReactProgressiveImage>
    );
  }
};

export default ProgressiveImage;
