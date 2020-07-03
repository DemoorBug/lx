const React = {
  createElement: (tag, props, ...children) => {
    if (typeof tag === "function") {
      return tag(props)
    }
    var element = { tag, props: { ...props, children } }
    return element
  }
}


const Nex = (props) => (
  <div className="react-2020">
    <h1>hello, person!</h1>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto deleniti, repellat ducimus eligendi voluptatum ullam, laboriosam suscipit deserunt necessitatibus, harum minus sed amet! Ea ratione quis, qui, vitae cumque quod.</p>
  </div>
)

const render = (reactElementOrStringOrNumber, container) => {
  console.log(reactElementOrStringOrNumber);

  if (['string', 'number'].includes(typeof reactElementOrStringOrNumber)) {
    return container.appendChild(document.createTextNode(String(reactElementOrStringOrNumber)))
  }
  const actualDomElement = document.createElement(reactElementOrStringOrNumber.tag)
  if (reactElementOrStringOrNumber.props) {
    Object.keys(reactElementOrStringOrNumber.props).filter(p => p !== 'children').forEach(p => {
      // console.log('p', p);
      // console.log('actualDomElement',actualDomElement);
      // console.log('reactElementOrStringOrNumber', reactElementOrStringOrNumber);
      // console.log(reactElementOrStringOrNumber.props[p]);

      return actualDomElement[p] = reactElementOrStringOrNumber.props[p]
    })
  }
  console.log(reactElementOrStringOrNumber);

  if (reactElementOrStringOrNumber.props.children) {
    reactElementOrStringOrNumber.props.children.forEach(child => {
        return render(child, actualDomElement)
    });
  }
  container.appendChild(actualDomElement)
}


render(<Nex/>, document.querySelector('#app'))
