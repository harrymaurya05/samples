import Hospital from 'hospital';
import MediBloc from 'medibloc';
import User from 'user';

const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
};

const run = async () => {
  console.log('phr-js sample Run the function.');
  const mediBloc = new MediBloc();

  // 사용자 본인인증 수행 
  // Perform user identity authentication
  const user = new User();
  const certification = user.certify();
  console.log('User-Authenticated');

  // 본인인증 결과를 블록체인에 기록
  // Record the identity verification result in a block chain
  const certificate = MediBloc.generateCertificate(user.getAddress(), certification);
  const certificateTxHash = await mediBloc.sendCertificate(certificate);
  console.log('MediBloc - The result of the users authentication is recorded in the block chain.');
  console.log(`           transaction Lookup: https://stg-testnet-node.medibloc.org/v1/transaction?hash=${certificateTxHash.hash}`);

  // MediBloc 이 사용자에게 인증서, tx hash 반환
  // Return the certificate to this user, tx hash
  user.certificate = certificate;
  user.certificateTxHash = certificateTxHash;

  // 본인인증 결과가 블록체인에 기록 되는 것을 기다립니다.
  await sleep(5000);

  // 병원 객체 생성. 생성자 내부적으로 mockup data 와 블록체인 계정을 생성 합니다.
  // Wait for the authentication result to be recorded in the block chain.
  const hospital = new Hospital();

  // 병원의 환자 id 와 블록체인 account 연계
  // Hospital patient id and block chain account linkage
  await hospital.mapAccountOntoPatientId(user);
  console.log('Hospital - linked patient id and users block chain account.');

  // 병원이 청구서, signed tx 생성하여 사용자(환자)에게 전달
  // The hospital generates the invoice, signed tx, and passes it to the user (patient)
  const claim = hospital.getClaim(user.getAddress());
  const claimTransactionRequest = hospital.getSignedTransaction(claim);
  console.log('Hospital - Signed on patients medical bill.');

  user.claim = claim;
  user.claimTxRequest = claimTransactionRequest;
};

run();
