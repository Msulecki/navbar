import React, { Component } from 'react';
import Submenu from './Submenu'

import './App.scss';

class App extends Component {

  state = {
    borderImage: '',
    gradientOffset: 0

  }
  componentDidMount() {
    const borderImage = window.getComputedStyle(this.refs.container).getPropertyValue("border-image")
    const borderImageArr = borderImage.match(/rgb.*?\)|#(.*?)(?=\s)/g)
    const offsetArr = borderImage.match(/(?<=\s)(\d+)(?=\%)/g)


    if (borderImageArr.length > 0) {
      this.setState({
        borderImage: borderImageArr,
        gradientOffset: offsetArr[1] - offsetArr[0]
      })

    }

  }
  handleMouseOver(type, ev) {
    const container = document.querySelector('ul.menu')
    let mousePosition = ev.pageX - container.getBoundingClientRect().left
    mousePosition = Math.floor(mousePosition / container.offsetWidth * 100)
    if (type === 'enter') {
    } else if (type === 'move') {

      if (mousePosition < 0) {
        mousePosition = 0
      } else if (mousePosition > container.offsetWidth) {
        mousePosition = container.offsetWidth
      }
      container.style.borderImage =
        `linear-gradient(90deg, 
        ${this.state.borderImage[0]} ${mousePosition - this.state.gradientOffset}%,
        ${this.state.borderImage[1]} ${mousePosition}%, 
        ${this.state.borderImage[2]} ${mousePosition + this.state.gradientOffset}%) 1`

      const submenu = document.querySelectorAll('.submenu')
      submenu.forEach(el => {
        el.style.backgroundImage = `linear-gradient(90deg, 
            ${this.state.borderImage[0]} ${mousePosition - this.state.gradientOffset}%,
            ${this.state.borderImage[1]} ${mousePosition}%, 
            ${this.state.borderImage[2]} ${mousePosition + this.state.gradientOffset}%)`

      })

    } else if (type === 'leave') {
      container.style.borderImage =
        `linear-gradient(90deg, 
        ${this.state.borderImage[0]} 20%, 
        ${this.state.borderImage[1]} 50%, 
        ${this.state.borderImage[2]} 80%) 1`
    }


  }
  handleItemHover(type, ev) {
    const offset = ev.target.getBoundingClientRect().left - this.refs.container.getBoundingClientRect().left

    let itemLength = 0
    let listHeight = 'auto'
    if (ev.target.className === 'menu__item') {
      console.log(ev.target.offsetHeight, ev.target.innerHeight);
      if (type === 'enter') {

        itemLength = ev.target.children[0].children.length
        listHeight = (itemLength * (ev.target.offsetHeight + 2)) + 'px'

        document.querySelectorAll('.submenu').forEach(el => {
          el.style.transform = `translateX(${offset - (ev.target.offsetWidth / 2)}px)`
          el.style.height = listHeight
        })

      }

    }

  }
  render() {
    return (
      <nav className="app">
        <ul
          ref='container'
          className='menu'
          role='navigation'
          onMouseEnter={this.handleMouseOver.bind(this, 'enter')}
          onMouseLeave={this.handleMouseOver.bind(this, 'leave')}
          onMouseMove={this.handleMouseOver.bind(this, 'move')}
        >

          <li
            onMouseLeave={this.handleItemHover.bind(this, 'leave')}
            onMouseEnter={this.handleItemHover.bind(this, 'enter')}
            className='menu__item'>Main 1<Submenu items={['dog', 'cat', 'mouse']} />
          </li>
          <li
            onMouseLeave={this.handleItemHover.bind(this, 'leave')}
            onMouseEnter={this.handleItemHover.bind(this, 'enter')}
            className='menu__item'>Main 2<Submenu items={['car', 'bike', 'plane', 'submarine']} />
          </li>
          <li
            onMouseLeave={this.handleItemHover.bind(this, 'leave')}
            onMouseEnter={this.handleItemHover.bind(this, 'enter')}
            className='menu__item'>Main 3<Submenu items={['vodka', 'beer', 'wine']} />
          </li>
          <li
            onMouseLeave={this.handleItemHover.bind(this, 'leave')}
            onMouseEnter={this.handleItemHover.bind(this, 'enter')}
            className='menu__item'>Main 4<Submenu items={['html', 'css', 'js', 'php', 'c++', 'ruby']} />
          </li>
          <li
            onMouseLeave={this.handleItemHover.bind(this, 'leave')}
            onMouseEnter={this.handleItemHover.bind(this, 'enter')}
            className='menu__item'>Main 5<Submenu items={['football', 'tennis']} />
          </li>

        </ul>
      </nav>
    );
  }
}

export default App;
