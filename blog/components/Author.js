import {Avatar, Divider} from 'antd'
import '../styles/component/author.css'
import {GithubOutlined, QqOutlined, WechatOutlined} from '@ant-design/icons'

const Author = () => {
  return (
    <div className="author-div comm-box">
      <div><Avatar size={100} src="http://blogimages.jspang.com/blogtouxiang1.jpg" /></div>
      <div className="author-introduction">
        光头程序员，专注于WEB和移动前端开发。要录1000集免费前端视频的傻X。此地维权无门，此时无能为力，此心随波逐流。
        <Divider>社交帐号</Divider>
        <GithubOutlined style={{fontSize:28, paddingRight: 10}} />
        <QqOutlined style={{fontSize:28, paddingRight: 10}} />
        <WechatOutlined style={{fontSize:28}} />
      </div>
    </div>
  )
}

export default Author