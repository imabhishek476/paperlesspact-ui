// import Div from "@jumbo/shared/Div";
import { Typography } from '@mui/material';
import React from 'react';
import Link from '@mui/material/Link';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Div from '../../../components/Shared/Div/Div';
import { Nunito } from 'next/font/google';

const nunito = Nunito({ subsets: ['latin'] });

function LoginFooter() {
  return (
    <Div sx={{ mt: 0 }}>
      <Div
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          maxHeight: '25%',
          marginTop: 0,
        }}
      >
        <Div
          sx={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 5,
          }}
          className={nunito.className}
        >
          <Link
            variant={'h2'}
            sx={{
              color: '#E8713C',
              fontSize: '12px',
              fontWeight: '500',
              mb: 4,
              cursor: 'pointer',
              '&:hover': {
                color: '#D94300',
              },
            }}
            href="https://easedraft.com/terms-and-conditions"
            underline="none"
            target="_blank"
            rel="noreferrer"
          >
            Terms & Conditions
          </Link>
          <Link
            variant={'h2'}
            sx={{
              color: '#E8713C',
              fontSize: '12px',
              fontWeight: '500',
              mb: 4,
              cursor: 'pointer',
              '&:hover': {
                color: '#D94300',
              },
            }}
            href="https://easedraft.com/privacy-policy"
            underline="none"
            target="_blank"
            rel="noreferrer"
          >
            Privacy Policy
          </Link>
          <Link
            variant={'h2'}
            sx={{
              color: '#E8713C',
              fontSize: '12px',
              fontWeight: '500',
              mb: 4,
              cursor: 'pointer',
              '&:hover': {
                color: '#D94300',
              },
            }}
            href="https://easedraft.com/about-us#contact"
            underline="none"
            target="_blank"
            rel="noreferrer"
          >
            Help
          </Link>
        </Div>
        <Div sx={{ display: "flex", alignItems: "start" }}>
          <Typography
            variant={"h2"}
            sx={{
              color: "#E8713C",
              fontSize: "12px",
              fontWeight: "500",
              mb: 4,
              cursor: "pointer",
            }}
          >
       English
          </Typography>
          
          <KeyboardArrowUpIcon color="secondary" fontSize="inherit"   mb= "4" />
        </Div>
      </Div>

      {/* <Typography
				variant={"h2"}
				sx={{
					color: "#151513",
					fontSize: "14px",
					fontWeight: "600",
					mb: 2,
				}}
				className={nunito.className}
			>
				Welcome to contrakt.live is providing prompt engineering solutions for the Agreements / Contracts Management with complete traceability.
			</Typography>
			<Typography
				variant={"h2"}
				sx={{
					color: "#151513",
					fontSize: "14px",
					fontWeight: "700",
				}}
			>
				Copyright © 2023-24 contrakt.live, @ All Rights Reserved
			</Typography> */}
    </Div>
  );
}

export default LoginFooter;
