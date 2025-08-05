import logo from "../../assets/agma-banner.jfif";

const Logo = ({ className } : { className?: string }) => {
  return (
    <img className={`${className}`} src={logo} alt="" />
  )
}

export default Logo
