import * as React from 'react'
import styled from 'styled-components'

const Cover = styled.img`
  max-height: 100%;
  max-width: 100%;
`

const ImgObject = styled.object`
  box-shadow: 0 10px 40px 0 rgba(56, 57, 69, 0.2);
  max-width: 100%;
  object-fit: cover;
`

export default ({ cover, className }) => (
  <ImgObject data={cover} className={className}>
    <Cover src="http://placehold.it/230x320/333/fff" />
  </ImgObject>
)
