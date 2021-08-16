import {useState} from 'react'
import Head from 'next/head'
import Link from 'next/link'
import {Row, Col, List} from 'antd'
import axios from 'axios'
import Header from '../components/Header'
import Author from '../components/Author'
import Advert from '../components/Advert'
import Footer from '../components/Footer'
import {CalendarOutlined, FileDoneOutlined, FireOutlined} from '@ant-design/icons'
import '../styles/pages/index.css'
import { resolveOnChange } from 'antd/lib/input/Input'
import servicePath from '../config/apiUrl'
import marked from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'

export default function Home(list) {
  const [myList, setMyList] = useState(list.data)
  const renderer = new marked.Renderer()

  marked.setOptions({
    renderer: renderer,
    gfm: true,  // 类似github上面的markdown的渲染方式
    pedantic: false,  // 容错机制 false表示允许完全不是markdown的格式也可以进行渲染
    sanitize: false,   // 是否忽略我的html标签
    tables: true,   // 渲染成github上面的表格形式 必须和gfm同时开启 不然就会失效
    breaks: false,   // 是否启用github的换行符 也要和gfm使用
    smartLists: true,  // 自动渲染列表的样式
    highlight: function(code) { // 如何让代码高亮
      return hljs.highlightAuto(code).value
    }
  })

  return (
    <div>
      <Head>
        <title>Home</title>
      </Head>
      <Header />
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}>
          <List 
            header={<div>最新日志</div>}
            itemLayout="vertical"
            dataSource={myList}
            renderItem={item => (
              <List.Item>
                <div className="list-title">
                  <Link href={{pathname: '/detailed', query: {id: item.id}}}><a>{item.title}</a>
                  </Link>
                </div>
                <div className="list-icon">
                  <span><CalendarOutlined /> {item.add_time}</span>
                  <span><FileDoneOutlined /> {item.type_name}</span>
                  <span><FireOutlined /> {item.view_count}人在看</span>
                </div>
                <div className="list-context" dangerouslySetInnerHTML={{__html: marked(item.introduce)}}>
                  {/* {item.introduce} */}
                </div>
              </List.Item>
            )}
          />
        </Col>
        <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author />
          <Advert />
        </Col>
      </Row>
      <Footer />
    </div>      
  )
}

Home.getInitialProps = async () => {
  const promise = new Promise((reslove) => {
    axios(servicePath.getArticleList).then((res) => {
      console.log("===============")
      reslove(res.data)
    })
  })

  return await promise
}
