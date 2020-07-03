import Link from 'next/link';
import { Button } from 'antd';

export default (props) => {
  const { children } = props
  return (
    <>
    <header>
      <Link href="/b?id=1" as='/b/1'>
        <Button>index</Button>
      </Link>
      <Link href="/routers">
        <Button>router</Button>
      </Link>
      <Link href="/a?id=helo" as='/a/helo'>
        <Button>router</Button>
      </Link>
      <Link href="/p/[id]" as={`/p/hello-nextjs`}>
        <a>hello-nextjs</a>
      </Link>
    </header>
    {children}
    </>
  )

}
