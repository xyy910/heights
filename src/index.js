//main.js
import React from 'react';
import ReactDom from 'react-dom';
import HeightList from 'list';

let container = (
    <HeightList/>
);

ReactDom.render(
    container,
    document.getElementById('root')
);