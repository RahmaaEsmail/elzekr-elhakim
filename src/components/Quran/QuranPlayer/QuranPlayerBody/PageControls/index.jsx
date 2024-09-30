import { Box, Container } from '@mui/material';
import PreviousPageButton from './PreviousPageButton';
import NextPageButton from './NextPageButton';
import PageNumber from './PageNumber';
import { memo, useContext } from 'react';
import QuranPlayerContext from '../../QuranPlayerContext';

function PageControls({ containerMaxWidth }) {
  const [quranPlayerState,] = useContext(QuranPlayerContext);
  const revNumber=()=>{
    let pages=[];
    for(let i=1;i<=quranPlayerState.endAyahPage;i++){
      pages.push(i)
    }
    return pages;
  }
  console.log(quranPlayerState.endAyahPage)
    return (
        <Box sx={{
            backgroundColor: '#9B102C',
            color: 'white',
            border: '2px solid',
            borderColor: '#9B102C',
            py: 2,
        }}>
            <Container maxWidth={containerMaxWidth} sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '20px',
            }}>
                <PreviousPageButton />
                {/* <div
                  style={{display:'flex', alginItems:'center',gap:'10px',width:'100px',overflowX:'auto'}}
                >
                  {
                    revNumber().map((itPage,inPage)=>{
                      return (
                        <h4 style={{width:'150px',display:'flex',alignItems:'center'}}>
                          <span>صفحه </span>
                          <span>{itPage}</span>
                        </h4>
                      )
                    })
                  }
                </div> */}
                <PageNumber />
                <NextPageButton />
            </Container>
        </Box>
    )
}

export default memo(PageControls)
