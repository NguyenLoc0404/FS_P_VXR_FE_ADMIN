class Header extends React.Component { 
    handleClick(event) {
      console.log(event.target.parentElement.getAttribute('name'));
    }
    render() {
      return (
        <Logo onClick={this.handleClick}/>
      );
    }
  }
  
  const Logo = ({onClick}) => {
    return (
      <a name="home" onClick={onClick} className="logo">
          <span className="logo-mini">Logo</span>
      </a>
    );
  };