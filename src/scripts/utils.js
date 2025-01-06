(function () {
    function isDOMElement(value) {
      return value instanceof Element;
    }
  
    function isValidAttribute(key) {
      const testElement = document.createElement("div");
      return key in testElement;
    }
  
    function createElement(element, attributes, children) {
      if (!element) {
        throw new Error("The element is not provided.");
      }
  
      const elem = document.createElement(element);
  
      if (!isDOMElement(elem)) {
        throw new Error("The element provided is not a valid DOM element.");
      }
  
      if (attributes) {
        for (const [name, value] of Object.entries(attributes)) {
          elem.setAttribute(name, value);
        }
      }
  
      if (children && typeof children === "string") {
        elem.innerText = children;
      } else if (Array.isArray(children)) {
        children.forEach((child) => {
          elem.appendChild(child);
        });
      } else if (children && typeof children === "object") {
        elem.appendChild(children);
      }
  
      return elem;
    }
  
    function render(element, target) {
      if (!isDOMElement(element)) {
        throw new Error("The element provided is not a valid DOM element.");
      }
  
      if (!isDOMElement(target)) {
        throw new Error("The target provided is not a valid DOM element.");
      }
  
      return target.appendChild(element);
    }
  
    const h1 = createElement("h1", { id: "title" }, [
      createElement("span", { style: "color: gray" }, "User"),
      createElement("span", { style: "color: lightgray" }, " Info!"),
    ]);
  
    window.UI = {
      createElement,
      render
    }
    
  })();