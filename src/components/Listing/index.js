import './index.css'

const Listing = props => {
  const {categories} = props

  return <li className="list-items">{categories}</li>
}
export default Listing
