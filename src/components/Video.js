import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
`

const Inner = styled.div`
  width: 100%;
  max-width:70rem;

  > div {
    padding-bottom: 56.25%;
    position: relative;
  }
  
  iframe {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
`

const Video = ({ url, width, height }) => (
  <Wrapper>
    <Inner>
      <div>
        <iframe src={url} width={width} height={height} frameBorder='0' allowFullScreen />
      </div>
    </Inner>
  </Wrapper>
)

Video.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  url: PropTypes.string.isRequired,
}

export default Video
