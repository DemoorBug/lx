import { withRouter } from 'next/router'
import { Button } from 'antd'

const A = ({ router }) => {
  return (
    <Button>
      {router.query.id}
    </Button>
  )
}

export default withRouter(A)
