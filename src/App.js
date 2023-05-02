import React, {useState, useEffect} from 'react';
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'
import { useDrop } from 'react-dnd';
import { add } from "app2/utils";
// import add from 'app2/utils';
// import 'app_05/components';


const RemoteButton = React.lazy(() => import('app2/Button'));
// const add = React.lazy(() => import('app2/utils'));



const App = () => {
  const type = 'tool1';
  const [app2Data, setApp2Data] = useState('');

  function handleChange(item) {
    // alert(item);
    setApp2Data(item);
  }

  const [{ isOver, canDrop }, drop] = useDrop(
    () => ({
      // 指定接收元素的类型，只有类型相同的元素才能进行drop操作
      accept: 'tool1',
      // type,
      // drop(item, monitor): 有拖拽物放置到元素上触发的回调方法，item表示拖拽物的描述数据，monitor表示 DropTargetMonitor实例，该方法返回一个对象，对象的数据可以由拖拽物的monitor.getDropResult方法获得
      drop(_item, monitor) {
        console.log('_item================drop');
        console.log(_item);
        const delta = monitor.getDifferenceFromInitialOffset() || {};
        const left = Math.round(delta.x || 0);
        const top = Math.round(delta.y || 0);
        console.log('app1====useDrop==left=====');
        console.log(left);
        // setOffsetX((offsetX) => {
        //   console.log('app1====useDrop==left=====');
        //   console.log(offsetX + left);
        //   return offsetX + left;
        // });
        // setOffsetY((offsetY) => offsetY + top);
        return { top, left };
      },
      // 判断拖拽物是否可以放置，item表示拖拽物的描述数据，monitor表示 DropTargetMonitor实例，返回一个bool值
      canDrop: (_item, monitor) => {
        const item = monitor.getItem();
        return item.type === type;
        // return false
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
        canDrop: !!monitor.canDrop(),
      }),
    }),
    [],
  );

  useEffect(() => {
    // console.log(add);

    // const ret = add(4,5);
    // console.log('add function========='+ret);
    alert(add(5,5));
  }, []);


  return (
    // <DndProvider backend={HTML5Backend}>
      <div style={{width: '100%',
        height: '100vh',
        border: '4px solid grey',
        // backgroundColor: canDrop ? 'rgba(7,193,96,0.3)' : '' ,
        // background: 'green',
        display: 'flex',
        // position: 'absolute',
        }}
        ref={drop}>
        <div>
          <h1>这是app1的内容【host】</h1><br />
          <div>{app2Data}</div>
        </div>
        <React.Suspense fallback="Loading Button">
          <RemoteButton HTML5Backend={HTML5Backend} data={'1'} handleChange={handleChange} />
        </React.Suspense>
      </div>
    //  </DndProvider>
    )
};

export default App;
