import React, { useState } from 'react';
import { Box, Button, Input, List, ListItem, VStack } from '@chakra-ui/react';
import useAuthStore from '../api/store';
import { useQuery, useQueryClient, useMutation } from 'react-query';
import { AdminList, DirectEntering, NewWaiting, WaitingStatus } from '../api/adminAPI';



function AdminPage() {
  const { StoreId } = useAuthStore();
  const [peopleCnt, setPeopleCnt] = useState('');
  const [userNo, setUserCnt] = useState('')
  const [error, setError] = useState("");

  const queryClient = useQueryClient();

  const handlePeoplecnt = (e) => {
    const value = e.target.value;
    if (value >= 1 && value <= 4) {
      setPeopleCnt(value);
      setError("");
    } else {
      setPeopleCnt("");
      setError("웨이팅은 1~4명!");
    }
  };
  const handleUserId = (e) => {
    setUserCnt(e.target.value);
  }

  const { data, isLoading, } = useQuery('admin-status', () => AdminList(StoreId));


  const directEntering = useMutation(DirectEntering, {
    onSuccess: () => {
      queryClient.invalidateQueries('admin-status')
    },
    onError: (error) => {
      console.error("바로 입장 실패" + error)
    }
  })

  const handleDirectEnterings = (peopleCnt, userNo) => {

    const directDTO = { peopleCnt, userNo, StoreId }
    directEntering.mutate(directDTO)
  }



  const waitingStatus = useMutation(WaitingStatus, {
    onSuccess: () => {
      queryClient.invalidateQueries('admin-status')
    }
  })

  const handleWaitingStatus = (status, waitingId) => {
    const statusDTO = { status, StoreId, waitingId }
    waitingStatus.mutate(statusDTO)
  }


  // const newWaitingStatus = useMutation(NewWaiting, {
  //   onSuccess: () => {
  //     queryClient.invalidateQueries('admin-status')
  //   }
  // })

  // const newWaiting = (newWaitingDto) => {
  //   const newWaitingDto = { peopleCnt, StoreId }

  // }



  if (isLoading) {
    return <span>Loading...</span>
  }
  console.log(data)
  // if (data) {
  //   return (
  //     <div>
  //       <Box>
  //         <h2>우리 현황</h2>
  //         <Box>
  //           <Input placeholder='유저번호' type="number" value={userNo} onChange={handleUserId} />
  //           <Input placeholder='인원' type="number" value={peopleCnt} onChange={handlePeoplecnt} />
  //           <Button onClick={() => handleDirectEnterings(peopleCnt, userNo)}>
  //             바로 입장
  //           </Button>
  //           <Box mt={2}>더 열심히 일하세요. 0왜 손님이 없을까요?</Box>
  //         </Box>
  //       </Box>
  //     </div>
  //   )
  // }

  return (
    <VStack align="center" spacing={4} maxWidth="600px" mx="auto" mt={8}>
      <Box >
        <h2>우리 현황</h2>

        {/* 
        <Box>
          <Input placeholder='유저번호' type="number" value={userNo} onChange={handleUserId} />
          <Input placeholder='인원' type="number" value={peopleCnt} onChange={handlePeoplecnt} />
          <Button onClick={() => handleDirectEnterings(peopleCnt, userNo)}>
            바로 입장
          </Button>
          <Box mt={2}>더 열심히 일하세요. 왜 손님이 없을까요?</Box>
        </Box> */}

        <Box
          height="450px"
          overflowY="auto"
          overflowX="hidden"
          width="450px"
          sx={{
            "&::-webkit-scrollbar": {
              width: "8px",
              borderRadius: "8px",
              backgroundColor: "rgba(0, 0, 0, 0.05)",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "rgba(0, 0, 0, 0.05)",
            },
          }}
        >

          <List display="flex" justifyContent="space-between">
            <Box>
              {data && data.ENTERED.map((item) => (
                <ListItem key={item.waitingId} py={2}>
                  <Box>
                    <strong>유저아이디:</strong> {item.UserId}
                  </Box>
                  <Box>
                    <strong>팀 테이블:</strong> {item.peopleCnt}
                  </Box>
                  <Box>
                    <strong>상태:</strong> {item.status}
                  </Box>
                  {item.status === "ENTERED" ? (

                    <Button onClick={() => handleWaitingStatus("EXITED", item.waitingId)}>퇴장</Button>
                  ) : (
                    <><Button onClick={() => handleWaitingStatus("DELAYED", item.waitingId)}>연기</Button>
                      <Button onClick={() => handleWaitingStatus("ENTERED", item.waitingId)}>입장</Button></>
                  )}
                </ListItem>
              ))}
            </Box>
            <Box>
              {data && data.WAITING.map((item) => (
                <ListItem key={item.waitingId} py={2}>
                  <Box>
                    <strong>유저아이디:</strong> {item.UserId}
                  </Box>
                  <Box>
                    <strong>팀 테이블:</strong> {item.peopleCnt}
                  </Box>
                  <Box>
                    <strong>상태:</strong> {item.status}
                  </Box>
                  {item.status === "WAITING" ? (
                    <>            <Button onClick={() => handleWaitingStatus("ENTERED", item.waitingId)}>입장</Button>
                      <Button onClick={() => handleWaitingStatus("DELAYED", item.waitingId)}>연기</Button> </>
                  ) : (
                    <>    <Button onClick={() => handleWaitingStatus("ENTERED", item.waitingId)}>입장</Button>
                      <Button onClick={() => handleWaitingStatus("EXITED", item.waitingId)}>퇴장</Button> </>

                  )}
                </ListItem>
              ))}
            </Box>
          </List>






        </Box>

      </Box>
    </VStack >
  );

}
export default AdminPage;
