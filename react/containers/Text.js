// @flow
import React from 'react';

// will check type by flow
export default function Text(props: { text: string }) {
  return <p>Text: {props.text}</p>
}
