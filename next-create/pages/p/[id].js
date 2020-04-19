import { useRouter } from 'next/router'

import { Button } from 'antd'

export default () => {
  const router = useRouter()
  return (
    <Button>
      {router.query.id}
    </Button>
  )
}
