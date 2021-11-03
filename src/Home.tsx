import { useEffect, useState } from "react";
import styled from "styled-components";
import Countdown from "react-countdown";
import { Button, CircularProgress, Snackbar } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import * as anchor from "@project-serum/anchor";
import './index.css'
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { WalletDialogButton } from "@solana/wallet-adapter-material-ui";

import {
  CandyMachine,
  awaitTransactionSignatureConfirmation,
  getCandyMachineState,
  mintOneToken,
  shortenAddress,
} from "./candy-machine";
import body1 from './Examples/Body/small Dark.png';
import body2 from './Examples/Body/small Green.png';
import body3 from './Examples/Body/small Blue.png';
import body4 from './Examples/Body/small Orange.png';
import body5 from './Examples/Body/small Purple.png';
import body6 from './Examples/Body/Long Dark.png';
import body7 from './Examples/Body/Long Green.png';
import body8 from './Examples/Body/Long Blue.png';
import body9 from './Examples/Body/Long Orange.png';
import body10 from './Examples/Body/Long Pink.png';
import drug1 from './Examples/Drug/cigar.png';
import drug2 from './Examples/Drug/cigarette.png';
import drug3 from './Examples/Drug/joint.png';
import drug4 from './Examples/Drug/pipe.png';
import accessory1 from './Examples/Accessory/axe.png';
import accessory2 from './Examples/Accessory/katana both.png';
import accessory3 from './Examples/Accessory/katana left.png';
import accessory4 from './Examples/Accessory/katana right.png';
import accessory5 from './Examples/Accessory/shotgun.png';
import eyes1 from './Examples/Eyes/arches.png';
import eyes2 from './Examples/Eyes/closed.png';
import eyes3 from './Examples/Eyes/normal.png';
import eyes4 from './Examples/Eyes/patch.png';
import eyes5 from './Examples/Eyes/sad.png';
import eyes6 from './Examples/Eyes/shades.png';
import eyes7 from './Examples/Eyes/stoner.png';
import eyes8 from './Examples/Eyes/tired.png';
import eyes9 from './Examples/Eyes/visor orange.png';
import eyes10 from './Examples/Eyes/visor purple.png';
import front_accessory1 from './Examples/front_accessory/bandolier.png';
import front_accessory2 from './Examples/front_accessory/barbell.png';
import front_accessory3 from './Examples/front_accessory/belt.png';
import front_accessory4 from './Examples/front_accessory/fish necklace blue.png';
import front_accessory5 from './Examples/front_accessory/fish necklace red.png';
import front_accessory6 from './Examples/front_accessory/fish necklace yellow.png';
import front_accessory7 from './Examples/front_accessory/fish necklace multi.png';
import front_accessory8 from './Examples/front_accessory/holster.png';
import hat1 from './Examples/Hat/black beret.png';
import hat2 from './Examples/Hat/cyan beret.png';
import hat3 from './Examples/Hat/pink beret.png';
import hat4 from './Examples/Hat/purple beret.png';
import hat5 from './Examples/Hat/blood.png';
import hat6 from './Examples/Hat/crip.png';
import hat7 from './Examples/Hat/burlap.png';
import hat8 from './Examples/Hat/construction.png';
import hat9 from './Examples/Hat/cowboy.png';
import hat10 from './Examples/Hat/crown.png';
import hat11 from './Examples/Hat/green top hat.png';
import hat12 from './Examples/Hat/purple top hat.png';
import hat13 from './Examples/Hat/red top hat.png';
import hat14 from './Examples/Hat/lavendar beanie.png';
import hat15 from './Examples/Hat/lime beanie.png';
import hat16 from './Examples/Hat/orange beanie.png';
import hat17 from './Examples/Hat/pink beanie.png';
import hat18 from './Examples/Hat/red beanie.png';
import hat19 from './Examples/Hat/white beanie.png';
import hat20 from './Examples/Hat/rainbow hat.png';
import hat21 from './Examples/Hat/straw hat.png';
import hat22 from './Examples/Hat/viking helmet.png';
import hat23 from './Examples/Hat/wizard hat.png';
import mouth1 from './Examples/Mouth/blue_1.png';
import mouth2 from './Examples/Mouth/blue_2.png';
import mouth3 from './Examples/Mouth/blue_3.png';
import mouth4 from './Examples/Mouth/blue_4.png';
import mouth5 from './Examples/Mouth/blue_5.png';
import mouth6 from './Examples/Mouth/green_1.png';
import mouth7 from './Examples/Mouth/green_2.png';
import mouth8 from './Examples/Mouth/green_3.png';
import mouth9 from './Examples/Mouth/green_4.png';
import mouth10 from './Examples/Mouth/green_5.png';
import mouth11 from './Examples/Mouth/red_1.png';
import mouth12 from './Examples/Mouth/red_2.png';
import mouth13 from './Examples/Mouth/red_3.png';
import mouth14 from './Examples/Mouth/red_4.png';
import mouth15 from './Examples/Mouth/red_5.png';
import mouth16 from './Examples/Mouth/yellow_1.png';
import mouth17 from './Examples/Mouth/yellow_2.png';
import mouth18 from './Examples/Mouth/yellow_3.png';
import mouth19 from './Examples/Mouth/yellow_4.png';
import mouth20 from './Examples/Mouth/yellow_5.png';
import shoes1 from './Examples/Shoes/Cowboy black.png';
import shoes2 from './Examples/Shoes/Cowboy brown.png';
import shoes3 from './Examples/Shoes/Sneaker black.png';
import shoes4 from './Examples/Shoes/sneaker blue.png';
import shoes5 from './Examples/Shoes/sneaker purple.png';
import shoes6 from './Examples/Shoes/sneaker red.png';
import shoes7 from './Examples/Shoes/space blue.png';
import shoes8 from './Examples/Shoes/space green.png';
import shoes9 from './Examples/Shoes/space orange.png';
import shoes10 from './Examples/Shoes/space purple.png';
import tattoo1 from './Examples/Tattoo/cut here.png';
import tattoo2 from './Examples/Tattoo/dragon.png';
import tattoo3 from './Examples/Tattoo/knife.png';
import tattoo4 from './Examples/Tattoo/skull blue rose.png';
import tattoo5 from './Examples/Tattoo/skull red rose.png';
import tattoo6 from './Examples/Tattoo/skull white rose.png';
import tattoo7 from './Examples/Tattoo/skull.png';
import tattoo8 from './Examples/Tattoo/teardrop.png';


const ConnectButton = styled(WalletDialogButton)``;

const CounterText = styled.span``; // add your styles here

const MintContainer = styled.div``; // add your styles here

const MintButton = styled(Button)``; // add your styles here

export interface HomeProps {
  candyMachineId: anchor.web3.PublicKey;
  config: anchor.web3.PublicKey;
  connection: anchor.web3.Connection;
  startDate: number;
  treasury: anchor.web3.PublicKey;
  txTimeout: number;
}

const Home = (props: HomeProps) => {
  const [balance, setBalance] = useState<number>();
  const [isActive, setIsActive] = useState(false); // true when countdown completes
  const [isSoldOut, setIsSoldOut] = useState(false); // true when items remaining is zero
  const [isMinting, setIsMinting] = useState(false); // true when user got to press MINT

  const [itemsAvailable, setItemsAvailable] = useState(0);
  const [itemsRedeemed, setItemsRedeemed] = useState(0);
  const [itemsRemaining, setItemsRemaining] = useState(0);

  const [alertState, setAlertState] = useState<AlertState>({
    open: false,
    message: "",
    severity: undefined,
  });

  const [startDate, setStartDate] = useState(new Date(props.startDate));

  const wallet = useAnchorWallet();
  const [candyMachine, setCandyMachine] = useState<CandyMachine>();

  const refreshCandyMachineState = () => {
    (async () => {
      if (!wallet) return;

      const {
        candyMachine,
        goLiveDate,
        itemsAvailable,
        itemsRemaining,
        itemsRedeemed,
      } = await getCandyMachineState(
        wallet as anchor.Wallet,
        props.candyMachineId,
        props.connection
      );

      setItemsAvailable(itemsAvailable);
      setItemsRemaining(itemsRemaining);
      setItemsRedeemed(itemsRedeemed);

      setIsSoldOut(itemsRemaining === 0);
      setStartDate(goLiveDate);
      setCandyMachine(candyMachine);
    })();
  };

  const onMint = async () => {
    try {
      setIsMinting(true);
      if (wallet && candyMachine?.program) {
        const mintTxId = await mintOneToken(
          candyMachine,
          props.config,
          wallet.publicKey,
          props.treasury
        );

        const status = await awaitTransactionSignatureConfirmation(
          mintTxId,
          props.txTimeout,
          props.connection,
          "singleGossip",
          false
        );

        if (!status?.err) {
          setAlertState({
            open: true,
            message: "Congratulations! Mint succeeded!",
            severity: "success",
          });
        } else {
          setAlertState({
            open: true,
            message: "Mint failed! Please try again!",
            severity: "error",
          });
        }
      }
    } catch (error: any) {
      // TODO: blech:
      let message = error.msg || "Minting failed! Please try again!";
      if (!error.msg) {
        if (error.message.indexOf("0x138")) {
        } else if (error.message.indexOf("0x137")) {
          message = `SOLD OUT!`;
        } else if (error.message.indexOf("0x135")) {
          message = `Insufficient funds to mint. Please fund your wallet.`;
        }
      } else {
        if (error.code === 311) {
          message = `SOLD OUT!`;
          setIsSoldOut(true);
        } else if (error.code === 312) {
          message = `Minting period hasn't started yet.`;
        }
      }

      setAlertState({
        open: true,
        message,
        severity: "error",
      });
    } finally {
      if (wallet) {
        const balance = await props.connection.getBalance(wallet.publicKey);
        setBalance(balance / LAMPORTS_PER_SOL);
      }
      setIsMinting(false);
      refreshCandyMachineState();
    }
  };

  useEffect(() => {
    (async () => {
      if (wallet) {
        const balance = await props.connection.getBalance(wallet.publicKey);
        setBalance(balance / LAMPORTS_PER_SOL);
      }
    })();
  }, [wallet, props.connection]);

  useEffect(refreshCandyMachineState, [
    wallet,
    props.candyMachineId,
    props.connection,
  ]);

  return (
    
    <main>
      
      {wallet && (
        <p style={{textAlign: "center"}}> Wallet {shortenAddress(wallet.publicKey.toBase58() || "")}</p>
      )}

      {wallet && <p style={{textAlign: "center"}}>Balance: {(balance || 0).toLocaleString()} SOL</p>}

      {wallet && <p style={{textAlign: "center"}}>Total Available: {itemsAvailable}</p>}

      {wallet && <p style={{textAlign: "center"}}>Redeemed: {itemsRedeemed}</p>}

      {wallet && <p style={{textAlign: "center"}}>Remaining: {itemsRemaining}</p>}
        
        <MintContainer>
        {!wallet ? (
          <ConnectButton>Connect Wallet</ConnectButton>
        ) : (
          <MintButton style={{justifyContent: "center", display: "block", margin: "auto"}}
            disabled={isSoldOut || isMinting || !isActive}
            onClick={onMint}
            variant="contained"
          >
            {isSoldOut ? (
              "SOLD OUT"
            ) : isActive ? (
              isMinting ? (
                <CircularProgress />
              ) : (
                "MINT: 1 SOL"
              )
            ) : (
              <Countdown
                date={startDate}
                onMount={({ completed }) => completed && setIsActive(true)}
                onComplete={() => setIsActive(true)}
                renderer={renderCounter}
              />
            )}
          </MintButton>
        )}
      </MintContainer>
      <h1 className='text' style={{textAlign:"center",  marginLeft: '25%', marginRight: '25%'}}> Perilous Penguins </h1>
      <p className='text' style={{textAlign:"center", display: "block"}}> The Perilous Penguins is a collection of 1000 uniquely generated Penguins living on the Solana blockchain.</p>

      <div className="box" style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around'}}>
        <h2 className='text' style={{textAlign:"center", marginLeft: '50%', marginRight: '50%'}}> Bodies </h2>
          <div className = "grid-unit">
            <img src={body1} className="grid" alt=""/>
            <text style={{textAlign:"center", display: "block"}}>Small Dark: Rarity 10%</text>
          </div>
          <div className = "grid-unit">
            <img src={body2} className="grid" alt=""/>
            <text style={{textAlign:"center", display: "block"}}>Small Green: Rarity 10%</text>
          </div>
          <div className = "grid-unit">
            <img src={body3} className="grid" alt=""/>
            <text style={{textAlign:"center", display: "block"}}>Small Blue: Rarity 10%</text>
          </div>
          <div className = "grid-unit">
            <img src={body4} className="grid" alt=""/>
            <text style={{textAlign:"center", display: "block"}}>Small Orange: Rarity 10%</text>
          </div>
          <div className = "grid-unit">
            <img src={body5} className="grid" alt=""/>
            <text style={{textAlign:"center", display: "block"}}>Small Purple: Rarity 10%</text>
          </div>
          <div className = "grid-unit">
            <img src={body6} className="grid" alt=""/>
            <text style={{textAlign:"center", display: "block"}}>Long Dark: Rarity 10%</text>
          </div>
          <div className = "grid-unit">
            <img src={body7} className="grid" alt=""/>
            <text style={{textAlign:"center", display: "block"}}>Long Green: Rarity 10%</text>
          </div>
          <div className = "grid-unit">
            <img src={body8} className="grid" alt=""/>
            <text style={{textAlign:"center", display: "block"}}>Long Blue: Rarity 10%</text>
          </div>
          <div className = "grid-unit">
            <img src={body9} className="grid" alt=""/>
            <text style={{textAlign:"center", display: "block"}}>Long Orange: Rarity 10%</text>
          </div>
          <div className = "grid-unit">
            <img src={body10} className="grid" alt=""/>
            <text style={{textAlign:"center", display: "block"}}>Long Pink: Rarity 10%</text>
          </div>
      </div>
      <div className="box" style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around'}}>
          <h2 className='text' style={{textAlign:"center",  marginLeft: '50%', marginRight: '50%'}}> Eyes </h2>
          <div className = "grid-unit">
            <img src={eyes1} className="grid" alt=""/>
            <text style={{textAlign:"center", display: "block"}}>Arches: Rarity 10%</text>
          </div>
          <div className = "grid-unit">
            <img src={eyes2} className="grid" alt=""/>
            <text style={{textAlign:"center", display: "block"}}>Closed: Rarity 10%</text>
          </div>
          <div className = "grid-unit">
            <img src={eyes3} className="grid" alt=""/>
            <text style={{textAlign:"center", display: "block"}}>Normal: Rarity 10%</text>
          </div>
          <div className = "grid-unit">
            <img src={eyes4} className="grid" alt=""/>
            <text style={{textAlign:"center", display: "block"}}>Patch: Rarity 10%</text>
          </div>
          <div className = "grid-unit">
            <img src={eyes5} className="grid" alt=""/>
            <text style={{textAlign:"center", display: "block"}}>Sad: Rarity 10%</text>
          </div>
          <div className = "grid-unit">
            <img src={eyes6} className="grid" alt=""/>
            <text style={{textAlign:"center", display: "block"}}>Shades: Rarity 10%</text>
          </div>
          <div className = "grid-unit">
            <img src={eyes7} className="grid" alt=""/>
            <text style={{textAlign:"center", display: "block"}}>Stoner: Rarity 10%</text>
          </div>
          <div className = "grid-unit">
            <img src={eyes8} className="grid" alt=""/>
            <text style={{textAlign:"center", display: "block"}}>Tired: Rarity 10%</text>
          </div>
          <div className = "grid-unit">
            <img src={eyes9} className="grid" alt=""/>
            <text style={{textAlign:"center", display: "block"}}>Orange Visor: Rarity 10%</text>
          </div>
          <div className = "grid-unit">
            <img src={eyes10} className="grid" alt=""/>
            <text style={{textAlign:"center", display: "block"}}>Purple Visor: Rarity 10%</text>
          </div>
      </div>
      <div className="box" style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around'}}>
          <h2 className='text' style={{textAlign:"center",  marginLeft: '50%', marginRight: '50%'}}> Mouthes </h2>
          <div className = "grid-unit">
            <img src={mouth1} className="grid" alt=""/>
            <text style={{textAlign:"center", display: "block"}}>Blue #1: Rarity 5% </text>
          </div>
          <div className = "grid-unit">
            <img src={mouth2} className="grid" alt=""/>
            <text style={{textAlign:"center", display: "block"}}>Blue #2: Rarity 5%</text>
          </div>
          <div className = "grid-unit">
            <img src={mouth3} className="grid" alt=""/>
            <text style={{textAlign:"center", display: "block"}}>Blue #3: Rarity 5%</text>
          </div>
          <div className = "grid-unit">
            <img src={mouth4} className="grid" alt=""/>
            <text style={{textAlign:"center", display: "block"}}>Blue #4: Rarity 5%</text>
          </div>
          <div className = "grid-unit">
            <img src={mouth5} className="grid" alt=""/>
            <text style={{textAlign:"center", display: "block"}}>Blue #5: Rarity 5%</text>
          </div>
          <div className = "grid-unit">
            <img src={mouth6} className="grid" alt=""/>
            <text style={{textAlign:"center", display: "block"}}>Green #1: Rarity 5%</text>
          </div>
          <div className = "grid-unit">
            <img src={mouth7} className="grid" alt=""/>
            <text style={{textAlign:"center", display: "block"}}>Green #2: Rarity 5%</text>
          </div>
          <div className = "grid-unit">
            <img src={mouth8} className="grid" alt=""/>
            <text style={{textAlign:"center", display: "block"}}>Green #3: Rarity 5%</text>
          </div>
          <div className = "grid-unit">
            <img src={mouth9} className="grid" alt=""/>
            <text style={{textAlign:"center", display: "block"}}>Green #4: Rarity 5%</text>
          </div>
          <div className = "grid-unit">
            <img src={mouth10} className="grid" alt=""/>
            <text style={{textAlign:"center", display: "block"}}>Green #5: Rarity 5%</text>
          </div>
          <div className = "grid-unit">
            <img src={mouth11} className="grid" alt=""/>
            <text style={{textAlign:"center", display: "block"}}>Red #1: Rarity 5%</text>
          </div>
          <div className = "grid-unit">
            <img src={mouth12} className="grid" alt=""/>
            <text style={{textAlign:"center", display: "block"}}>Red #2: Rarity 5%</text>
          </div>
          <div className = "grid-unit">
            <img src={mouth13} className="grid" alt=""/>
            <text style={{textAlign:"center", display: "block"}}>Red #3: Rarity 5%</text>
          </div>
          <div className = "grid-unit">
            <img src={mouth14} className="grid" alt=""/>
            <text style={{textAlign:"center", display: "block"}}>Red #4: Rarity 5%</text>
          </div>
          <div className = "grid-unit">
            <img src={mouth15} className="grid" alt=""/>
            <text style={{textAlign:"center", display: "block"}}>Red #5: Rarity 5%</text>
          </div>
          <div className = "grid-unit">
            <img src={mouth16} className="grid" alt=""/>
            <text style={{textAlign:"center", display: "block"}}>Yellow #1: Rarity 5%</text>
          </div>
          <div className = "grid-unit">
            <img src={mouth17} className="grid" alt=""/>
            <text style={{textAlign:"center", display: "block"}}>Yellow #2: Rarity 5%</text>
          </div>
          <div className = "grid-unit">
            <img src={mouth18} className="grid" alt=""/>
            <text style={{textAlign:"center", display: "block"}}>Yellow #3: Rarity 5%</text>
          </div>
          <div className = "grid-unit">
            <img src={mouth19} className="grid" alt=""/>
            <text style={{textAlign:"center", display: "block"}}>Yellow #4: Rarity 5%</text>
          </div>
          <div className = "grid-unit">
            <img src={mouth20} className="grid" alt=""/>
            <text style={{textAlign:"center", display: "block"}}>Yellow #5: Rarity 5%</text>
          </div>
      </div>
      <div className="box" style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around'}}>
          <h2 className='text' style={{textAlign:"center",  marginLeft: '50%', marginRight: '50%'}}> Hats </h2>
          <div className = "grid-unit">
            <img src={hat1} className="grid" alt=""/>
            <text style={{textAlign:"center", display: "block"}}>Black Beret: Rarity 2%</text>
          </div>
          <div className = "grid-unit">
            <img src={hat2} className="grid" alt=""/>
            <text style={{textAlign:"center", display: "block"}}>Cyan Beret: Rarity 2%</text>
          </div>
          <div className = "grid-unit">
            <img src={hat3} className="grid" alt=""/>
            <text style={{textAlign:"center", display: "block"}}>Pink Beret: Rarity 2%</text>
          </div>
          <div className = "grid-unit">
            <img src={hat4} className="grid" alt=""/>
            <text style={{textAlign:"center", display: "block"}}>Purple Beret: Rarity 2%</text>
          </div>
          <div className = "grid-unit">
            <img src={hat5} className="grid" alt=""/>
            <text style={{textAlign:"center", display: "block"}}>Red Durag: Rarity 4%</text>
          </div>
          <div className = "grid-unit">
            <img src={hat6} className="grid" alt=""/>
            <text style={{textAlign:"center", display: "block"}}>Blue Durag: Rarity 4%</text>
          </div>
          <div className = "grid-unit">
            <img src={hat7} className="grid" alt=""/>
            <text style={{textAlign:"center", display: "block"}}>Burlap Hat: Rarity 8%</text>
          </div>
          <div className = "grid-unit">
            <img src={hat8} className="grid" alt=""/>
            <text style={{textAlign:"center", display: "block"}}>Construction Helmet: Rarity 8%</text>
          </div>
          <div className = "grid-unit">
            <img src={hat9} className="grid" alt=""/>
            <text style={{textAlign:"center", display: "block"}}>Cowboy Hat: Rarity 8%</text>
          </div>
          <div className = "grid-unit">
            <img src={hat10} className="grid" alt=""/>
            <text style={{textAlign:"center", display: "block"}}>Crown: Rarity 8%</text>
          </div>
          <div className = "grid-unit">
            <img src={hat11} className="grid" alt=""/>
            <text style={{textAlign:"center", display: "block"}}>Green Top Hat: Rarity 3%</text>
          </div>
          <div className = "grid-unit">
            <img src={hat12} className="grid" alt=""/>
            <text style={{textAlign:"center", display: "block"}}>Purple Top Hat: Rarity 3%</text>
          </div>
          <div className = "grid-unit">
            <img src={hat13} className="grid" alt=""/>
            <text style={{textAlign:"center", display: "block"}}>Red Top Hat: Rarity 3%</text>
          </div>
          <div className = "grid-unit">
            <img src={hat14} className="grid" alt=""/>
            <text style={{textAlign:"center", display: "block"}}>Lavendar Beanie: Rarity 1%</text>
          </div>
          <div className = "grid-unit">
            <img src={hat15} className="grid" alt=""/>
            <text style={{textAlign:"center", display: "block"}}>Lime Beanie: Rarity 1%</text>
          </div>
          <div className = "grid-unit">
            <img src={hat16} className="grid" alt=""/>
            <text style={{textAlign:"center", display: "block"}}>Orange Beanie: Rarity 1%</text>
          </div>
          <div className = "grid-unit">
            <img src={hat17} className="grid" alt=""/>
            <text style={{textAlign:"center", display: "block"}}>Pink Beanie: Rarity 1%</text>
          </div>
          <div className = "grid-unit">
            <img src={hat18} className="grid" alt=""/>
            <text style={{textAlign:"center", display: "block"}}>Red Beanie: Rarity 1%</text>
          </div>
          <div className = "grid-unit">
            <img src={hat19} className="grid" alt=""/>
            <text style={{textAlign:"center", display: "block"}}>White Beanie: Rarity 1%</text>
          </div>
          <div className = "grid-unit">
            <img src={hat20} className="grid" alt=""/>
            <text style={{textAlign:"center", display: "block"}}>Rainbow Hat: Rarity 8%</text>
          </div>
          <div className = "grid-unit">
            <img src={hat21} className="grid" alt=""/>
            <text style={{textAlign:"center", display: "block"}}>Straw Hat: Rarity 8%</text>
          </div>
          <div className = "grid-unit">
            <img src={hat22} className="grid" alt=""/>
            <text style={{textAlign:"center", display: "block"}}>Viking Helmet: Rarity 8%</text>
          </div>
          <div className = "grid-unit">
            <img src={hat23} className="grid" alt=""/>
            <text style={{textAlign:"center", display: "block"}}>Wizard Hat: Rarity 8%</text>
          </div>
      </div>
      <div className="box" style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around'}}>
          <h2 className='text' style={{textAlign:"center",  marginLeft: '50%', marginRight: '50%'}}> Shoes </h2>
          <div className = "grid-unit">
            <img src={shoes1} className="grid" alt=""/>
            <text style={{textAlign:"center", display: "block"}}>Black Cowboy Boots: Rarity 10%</text>
          </div>
          <div className = "grid-unit">
            <img src={shoes2} className="grid" alt=""/>
            <text style={{textAlign:"center", display: "block"}}>Brown Cowboy Boots: Rarity 10%</text>
          </div>
          <div className = "grid-unit">
            <img src={shoes3} className="grid" alt=""/>
            <text style={{textAlign:"center", display: "block"}}>Black Sneakers: Rarity 10%</text>
          </div>
          <div className = "grid-unit">
            <img src={shoes4} className="grid" alt=""/>
            <text style={{textAlign:"center", display: "block"}}>Blue Sneakers: Rarity 10%</text>
          </div>
          <div className = "grid-unit">
            <img src={shoes5} className="grid" alt=""/>
            <text style={{textAlign:"center", display: "block"}}>Purple Sneakers: Rarity 10%</text>
          </div>
          <div className = "grid-unit">
            <img src={shoes6} className="grid" alt=""/>
            <text style={{textAlign:"center", display: "block"}}>Red Sneakers: Rarity 10%</text>
          </div>
          <div className = "grid-unit">
            <img src={shoes7} className="grid" alt=""/>
            <text style={{textAlign:"center", display: "block"}}>Blue Space Boots: Rarity 10%</text>
          </div>
          <div className = "grid-unit">
            <img src={shoes8} className="grid" alt=""/>
            <text style={{textAlign:"center", display: "block"}}>Green Space Boots: Rarity 10%</text>
          </div>
          <div className = "grid-unit">
            <img src={shoes9} className="grid" alt=""/>
            <text style={{textAlign:"center", display: "block"}}>Orange Space Boots: Rarity 10%</text>
          </div>
          <div className = "grid-unit">
            <img src={shoes10} className="grid" alt=""/>
            <text style={{textAlign:"center", display: "block"}}>Purple Space Boots: Rarity 10%</text>
          </div>
      </div>
      <div className="box" style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around'}}>
          <h2 className='text' style={{textAlign:"center",  marginLeft: '50%', marginRight: '50%'}}> Rear Accessories </h2>
          <div className = "grid-unit">
            <img src={accessory1} className="grid" alt=""/>
            <text style={{textAlign:"center", display: "block"}}>Axe: Rarity 17%</text>
          </div>
          <div className = "grid-unit">
            <img src={accessory2} className="grid" alt=""/>
            <text style={{textAlign:"center", display: "block"}}>Both Katana: Rarity 6%</text>
          </div>
          <div className = "grid-unit">
            <img src={accessory3} className="grid" alt=""/>
            <text style={{textAlign:"center", display: "block"}}>Right Katana: Rarity 6%</text>
          </div>
          <div className = "grid-unit">
            <img src={accessory4} className="grid" alt=""/>
            <text style={{textAlign:"center", display: "block"}}>Left Katana: Rarity 6%</text>
          </div>
          <div className = "grid-unit">
            <img src={accessory5} className="grid" alt=""/>
            <text style={{textAlign:"center", display: "block"}}>Shotgun: Rarity 17%</text>
          </div>
      </div>
      <div className="box" style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around'}}>
          <h2 className='text' style={{textAlign:"center",  marginLeft: '50%', marginRight: '50%'}}> Frontal Accessories </h2>
          <div className = "grid-unit">
            <img src={front_accessory1} className="grid" alt=""/>
            <text style={{textAlign:"center", display: "block"}}>Bandolier: Rarity 10%</text>
          </div>
          <div className = "grid-unit">
            <img src={front_accessory2} className="grid" alt=""/>
            <text style={{textAlign:"center", display: "block"}}>Barbell: Rarity 10%</text>
          </div>
          <div className = "grid-unit">
            <img src={front_accessory3} className="grid" alt=""/>
            <text style={{textAlign:"center", display: "block"}}>Tool-Belt: Rarity 10%</text>
          </div>
          <div className = "grid-unit">
            <img src={front_accessory4} className="grid" alt=""/>
            <text style={{textAlign:"center", display: "block"}}>Blue Fish Necklace: Rarity 2.5%</text>
          </div>
          <div className = "grid-unit">
            <img src={front_accessory5} className="grid" alt=""/>
            <text style={{textAlign:"center", display: "block"}}>Red Fish Necklace: Rarity 2.5%</text>
          </div>
          <div className = "grid-unit">
            <img src={front_accessory6} className="grid" alt=""/>
            <text style={{textAlign:"center", display: "block"}}>Yellow Fish Necklace: Rarity 2.5%</text>
          </div>
          <div className = "grid-unit">
            <img src={front_accessory7} className="grid" alt=""/>
            <text style={{textAlign:"center", display: "block"}}>Multi Fish Necklace: Rarity 2.5%</text>
          </div>
          <div className = "grid-unit">
            <img src={front_accessory8} className="grid" alt=""/>
            <text style={{textAlign:"center", display: "block"}}>Holster: Rarity 10%</text>
          </div>
      </div>
      <div className="box" style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around'}}>
          <h2 className='text' style={{textAlign:"center",  marginLeft: '50%', marginRight: '50%'}}> Drugs </h2>
          <div className = "grid-unit">
            <img src={drug1} className="grid" alt=""/>
            <text style={{textAlign:"center", display: "block"}}>Cigar: Rarity 12.5%</text>
          </div>
          <div className = "grid-unit">
            <img src={drug2} className="grid" alt=""/>
            <text style={{textAlign:"center", display: "block"}}>Cigarette: Rarity 12.5%</text>
          </div>
          <div className = "grid-unit">
            <img src={drug3} className="grid" alt=""/>
            <text style={{textAlign:"center", display: "block"}}>Joint: Rarity 12.5%</text>
          </div>
          <div className = "grid-unit">
            <img src={drug4} className="grid" alt=""/>
            <text style={{textAlign:"center", display: "block"}}>Pipe: Rarity 12.5%</text>
          </div>
      </div>
      <div className="box" style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around'}}>
          <h2 className='text' style={{textAlign:"center",  marginLeft: '50%', marginRight: '50%'}}> Tattoos </h2>
          <div className = "grid-unit">
            <img src={tattoo1} className="grid" alt=""/>
            <text style={{textAlign:"center", display: "block"}}>Cut Here: Rarity 10%</text>
          </div>
          <div className = "grid-unit">
            <img src={tattoo2} className="grid" alt=""/>
            <text style={{textAlign:"center", display: "block"}}>Dragon: Rarity 10%</text>
          </div>
          <div className = "grid-unit">
            <img src={tattoo3} className="grid" alt=""/>
            <text style={{textAlign:"center", display: "block"}}>Knife: Rarity 10%</text>
          </div>
          <div className = "grid-unit">
            <img src={tattoo4} className="grid" alt=""/>
            <text style={{textAlign:"center", display: "block"}}>Skull Blue Rose: Rarity 2.5%</text>
          </div>
          <div className = "grid-unit">
            <img src={tattoo5} className="grid" alt=""/>
            <text style={{textAlign:"center", display: "block"}}>Skull Red Rose: Rarity 2.5%</text>
          </div>
          <div className = "grid-unit">
            <img src={tattoo6} className="grid" alt=""/>
            <text style={{textAlign:"center", display: "block"}}>Skull White Rose: Rarity 2.5%</text>
          </div>
          <div className = "grid-unit">
            <img src={tattoo7} className="grid" alt=""/>
            <text style={{textAlign:"center", display: "block"}}>Skull: Rarity 2.5%</text>
          </div>
          <div className = "grid-unit">
            <img src={tattoo8} className="grid" alt=""/>
            <text style={{textAlign:"center", display: "block"}}>Teardrop: Rarity 10%</text>
          </div>


      </div>
      

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
    </main>
  );
};

interface AlertState {
  open: boolean;
  message: string;
  severity: "success" | "info" | "warning" | "error" | undefined;
}

const renderCounter = ({ days, hours, minutes, seconds, completed }: any) => {
  return (
    <CounterText>
      {hours + (days || 0) * 24} hours, {minutes} minutes, {seconds} seconds
    </CounterText>
  );
};

export default Home;
