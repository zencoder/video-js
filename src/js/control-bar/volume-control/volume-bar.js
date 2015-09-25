/**
 * @file volume-bar.js
 */
import Slider from '../../slider/slider.js';
import Component from '../../component.js';
import * as Fn from '../../utils/fn.js';

// Required children
import VolumeLevel from './volume-level.js';

/**
 * The bar that contains the volume level and can be clicked on to adjust the level
 *
 * @param {Player|Object} player
 * @param {Object=} options
 * @extends Slider
 * @class VolumeBar
 */
class VolumeBar extends Slider {

  constructor(player, options){
    super(player, options);
    this.on(player, 'volumechange', this.updateARIAAttributes);
    player.ready(Fn.bind(this, this.updateARIAAttributes));
    player.ready(() => this.on(this.el().parentNode, ['mousedown', 'touchdown'], this.handleMouseDown));
  }

  /**
   * Create the component's DOM element
   *
   * @return {Element}
   * @method createEl
   */
  createEl() {
    return super.createEl('div', {
      className: 'vjs-volume-bar vjs-slider-bar'
    }, {
      'aria-label': 'volume level'
    });
  }

  /**
   * Handle mouse move on volume bar
   *
   * @method handleMouseMove
   */
  handleMouseMove(event) {
    if (this.player_.muted()) {
      this.player_.muted(false);
    }

    this.player_.volume(this.calculateDistance(event));
  }

  handleMouseDown(event) {
    super.handleMouseDown(event);

    this.on(this.el().parentNode, ['mousemove', 'touchmove'], this.handleMouseMove);
    this.on(this.el().parentNode, ['mouseup', 'touchend'], this.handleMouseUp);
  }

  handleMouseUp(event) {
    super.handleMouseUp(event);

    this.off(this.el().parentNode, ['mousemove', 'touchmove'], this.handleMouseMove);
  }

  /**
   * Get percent of volume level
   *
   * @retun {Number} Volume level percent
   * @method getPercent
   */
  getPercent() {
    if (this.player_.muted()) {
      return 0;
    } else {
      return this.player_.volume();
    }
  }

  /**
   * Increase volume level for keyboard users
   *
   * @method stepForward
   */
  stepForward() {
    this.player_.volume(this.player_.volume() + 0.1);
  }

  /**
   * Decrease volume level for keyboard users
   *
   * @method stepBack
   */
  stepBack() {
    this.player_.volume(this.player_.volume() - 0.1);
  }

  /**
   * Update ARIA accessibility attributes
   *
   * @method updateARIAAttributes
   */
  updateARIAAttributes() {
    // Current value of volume bar as a percentage
    let volume = (this.player_.volume() * 100).toFixed(2);
    this.el_.setAttribute('aria-valuenow', volume);
    this.el_.setAttribute('aria-valuetext', volume + '%');
  }

}

VolumeBar.prototype.options_ = {
  children: [
    'volumeLevel'
  ],
  'barName': 'volumeLevel'
};

VolumeBar.prototype.playerEvent = 'volumechange';

Component.registerComponent('VolumeBar', VolumeBar);
export default VolumeBar;
