import {useEffect, useRef, useState} from "react";
import styled from "styled-components";
import { Button, Snackbar, Typography } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import bs58 from "bs58";
import * as anchor from "@project-serum/anchor";
import { getParsedNftAccountsByOwner } from "@nfteyez/sol-rayz";

import { useAnchorWallet, useWallet } from "@solana/wallet-adapter-react";
import { WalletDialogButton } from "@solana/wallet-adapter-material-ui";
import Container from "@mui/material/Container";

import { shortenAddress } from "./candy-machine";
import axios from "axios";
import title from "./text2.png";
import Cookies from "js-cookie";
import React from "react";
import {Link} from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import Title from "./Components/Title";

axios.defaults.withCredentials = true;

const ConnectButton = styled(WalletDialogButton)``;

const MintContainer = styled(Container)``; // add your styles here

const MintButton = styled(Button)``; // add your styles here
const NormalButton = styled(Button)`` // add your styles here
export interface HomeProps {
  connection: anchor.web3.Connection;
}

const Home = (props: HomeProps) => {
  const navigate = useNavigate();
  const [alertState, setAlertState] = useState<AlertState>({
    open: false,
    message: "",
    severity: undefined,
  });

  const recaptchaRef = useRef(null);

  const { publicKey, signMessage } = useWallet();
  const wallet = useAnchorWallet();
  const tokenList = getParsedNftAccountsByOwner({
    publicAddress: publicKey,
    connection: props.connection,
  });

  const [logged, setLogged] = useState(false);
  const [captchaDone, setCaptchaDone] = useState(false);

  useEffect(() => {
    if(Cookies.get('connect.sid') != null){
      setLogged(true);
    }
  }, []);



  
  const renderTitle = () => {
    return (
      <Title />
    );
  };

  const renderMintButton = () => (
    <>
      {wallet && (
        <Typography
          variant="body1"
          component="p"
          style={{ marginBottom: "1em", marginTop: "1em" }}
        >
          Wallet: {shortenAddress(wallet.publicKey.toBase58() || "")}
        </Typography>
      )}

    </>
  );


  return (
    <>
      <MintContainer>
        {renderTitle()}
        <div
          style={{
            width: "100%",
            margin: "auto 0",
            textAlign: "center",
            height: "15em",
          }}
        >
          {logged ? (
              <>
                {!wallet ? (
                    <ConnectButton>Connect Wallet</ConnectButton>
                ) : (
                    <div style={{display:'flex', flexDirection:'column',alignItems:'center',justifyContent:'space-between',alignContent:'space-between',padding:20,height:100}}>
                  
                      <NormalButton  style={{width:350,
                        padding:10,
                        margin:5,
                        justifyContent:'center'}} className="MuiButtonBase-root MuiButton-root MuiButton-contained sc-bdfBQB MuiButton-containedPrimary" onClick={()=>{navigate('/customcm');}}>
                        Custom CM
                      </NormalButton>
                      <NormalButton  style={{width:350,
                        padding:10,
                        margin:5,
                        justifyContent:'center'}} disabled={true} className="MuiButtonBase-root MuiButton-root MuiButton-contained sc-bdfBQB MuiButton-containedPrimary"   >
                        SRL DAO
                      </NormalButton>
                      <NormalButton  style={{width:350,
                        padding:10,
                        margin:5,
                        justifyContent:'center'}} disabled={true} className="MuiButtonBase-root MuiButton-root MuiButton-contained sc-bdfBQB MuiButton-containedPrimary" >
                        SRL Scrapper
                      </NormalButton>
                    </div>
                )}
              </>
          ) : (
              <>
                <ConnectButton>Connect</ConnectButton>
                <NormalButton  style={{width:350,
                        padding:10,
                        margin:5,
                        justifyContent:'center'}} className="MuiButtonBase-root MuiButton-root MuiButton-contained sc-bdfBQB MuiButton-containedPrimary" onClick={()=>{navigate('/customcm');}}>
                        Custom CM
                </NormalButton>
              </>
      
          )}
          <>

          </>
        </div>
      </MintContainer>

      <Snackbar
        open={alertState.open}
        autoHideDuration={6000}
        onClose={() => setAlertState({ ...alertState, open: false })}
      >
        <Alert
          onClose={() => setAlertState({ ...alertState, open: false })}
          severity={alertState.severity}
        >
          {alertState.message}
        </Alert>
      </Snackbar>
      <div className="social-links flex-row space-between-lg flex align-center">
          <span className="link white font-md weight-400 cursor-pointer">
            <a
              href="https://discord.gg/xMMAaCkc"
              target="_blank"
              rel="noreferrer"
            >
              Discord
            </a>
          </span>
          <span className="link white font-md weight-400 cursor-pointer">
            <a
              href="https://twitter.com/NewNeonNFT"
              target="_blank"
              rel="noreferrer"
            >
              Twitter
            </a>
          </span>
        </div>

    </>
  );
};

interface AlertState {
  open: boolean;
  message: string;
  severity: "success" | "info" | "warning" | "error" | undefined;
}

export default Home;
