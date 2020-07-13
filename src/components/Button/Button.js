import styled from 'styled-components'

const Button = styled.button`
  background-color: #ABB2B9;
  padding: 10px 15px;
  border: none;
  border-radius: 3px;
  color: #fff;
  margin-right:20px;
  :hover{
    filter: grayscale(.5);
  }
  :disabled {
    background-color: #566573;
    color: #ABB2B9;
  }
`

export default Button