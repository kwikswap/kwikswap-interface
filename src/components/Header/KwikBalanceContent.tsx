import { ChainId, TokenAmount } from '@kwikswap/sdk'
import React, { useMemo } from 'react'
import { X } from 'react-feather'
import styled from 'styled-components'
import tokenLogo from '../../assets/images/token-logo.png'
import { KWIK } from '../../constants'
import { useTotalSupply } from '../../data/TotalSupply'
import { useActiveWeb3React } from '../../hooks'
import { useMerkleDistributorContract } from '../../hooks/useContract'
import useCurrentBlockTimestamp from '../../hooks/useCurrentBlockTimestamp'
import { useTotalKwikEarned } from '../../state/stake/hooks'
import { useAggregateKwikBalance, useTokenBalance } from '../../state/wallet/hooks'
import { ExternalLink, StyledInternalLink, TYPE, KwikTokenAnimated } from '../../theme'
import { computeKwikCirculation } from '../../utils/computeKwikCirculation'
import useUSDCPrice from '../../utils/useUSDCPrice'
import { AutoColumn } from '../Column'
import { RowBetween } from '../Row'
import { Break, CardBGImage, CardNoise, CardSection, DataCard } from '../vote/styled'

const ContentWrapper = styled(AutoColumn)`
  width: 100%;
`

const ModalUpper = styled(DataCard)`
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  // background: radial-gradient(76.02% 75.41% at 1.84% 0%, #ff007a 0%, #021d43 100%);
  background: radial-gradient(76.02% 75.41% at 1.84% 0%, #5fb347 0%, #f97341 100%);
  padding: 0.5rem;
`

const StyledClose = styled(X)`
  position: absolute;
  right: 16px;
  top: 16px;

  :hover {
    cursor: pointer;
  }
`

/**
 * Content for balance stats modal
 */
export default function KwikBalanceContent({ setShowKwikBalanceModal }: { setShowKwikBalanceModal: any }) {
  const { account, chainId } = useActiveWeb3React()
  const kwik = chainId ? KWIK[chainId] : undefined

  const total = useAggregateKwikBalance()
  const kwikBalance: TokenAmount | undefined = useTokenBalance(account ?? undefined, kwik)
  const kwikToClaim: TokenAmount | undefined = useTotalKwikEarned()

  const totalSupply: TokenAmount | undefined = useTotalSupply(kwik)
  const kwikPrice = useUSDCPrice(kwik)
  const blockTimestamp = useCurrentBlockTimestamp()
  const unclaimedKwik = useTokenBalance(useMerkleDistributorContract()?.address, kwik)
  const circulation: TokenAmount | undefined = useMemo(
    () =>
      blockTimestamp && kwik && chainId === ChainId.MAINNET
        ? computeKwikCirculation(kwik, blockTimestamp, unclaimedKwik)
        : totalSupply,
    [blockTimestamp, chainId, totalSupply, unclaimedKwik, kwik]
  )

  return (
    <ContentWrapper gap="lg">
      <ModalUpper>
        <CardBGImage />
        <CardNoise />
        <CardSection gap="md">
          <RowBetween>
            <TYPE.white color="white">Your KWIK Breakdown</TYPE.white>
            <StyledClose stroke="white" onClick={() => setShowKwikBalanceModal(false)} />
          </RowBetween>
        </CardSection>
        <Break />
        {account && (
          <>
            <CardSection gap="sm">
              <AutoColumn gap="md" justify="center">
                <KwikTokenAnimated width="48px" src={tokenLogo} />{' '}
                <TYPE.white fontSize={48} fontWeight={600} color="white">
                  {total?.toFixed(2, { groupSeparator: ',' })}
                </TYPE.white>
              </AutoColumn>
              <AutoColumn gap="md">
                <RowBetween>
                  <TYPE.white color="white">Balance:</TYPE.white>
                  <TYPE.white color="white">{kwikBalance?.toFixed(2, { groupSeparator: ',' })}</TYPE.white>
                </RowBetween>
                <RowBetween>
                  <TYPE.white color="white">Unclaimed:</TYPE.white>
                  <TYPE.white color="white">
                    {kwikToClaim?.toFixed(4, { groupSeparator: ',' })}{' '}
                    {kwikToClaim && kwikToClaim.greaterThan('0') && (
                      <StyledInternalLink onClick={() => setShowKwikBalanceModal(false)} to="/kwik">
                        (claim)
                      </StyledInternalLink>
                    )}
                  </TYPE.white>
                </RowBetween>
              </AutoColumn>
            </CardSection>
            <Break />
          </>
        )}
        <CardSection gap="sm">
          <AutoColumn gap="md">
            <RowBetween>
              <TYPE.white color="white">KWIK price:</TYPE.white>
              <TYPE.white color="white">${kwikPrice?.toFixed(2) ?? '-'}</TYPE.white>
            </RowBetween>
            <RowBetween>
              <TYPE.white color="white">KWIK in circulation:</TYPE.white>
              <TYPE.white color="white">{circulation?.toFixed(0, { groupSeparator: ',' })}</TYPE.white>
            </RowBetween>
            <RowBetween>
              <TYPE.white color="white">Total Supply</TYPE.white>
              <TYPE.white color="white">{totalSupply?.toFixed(0, { groupSeparator: ',' })}</TYPE.white>
            </RowBetween>
            {kwik && kwik.chainId === ChainId.MAINNET ? (
              <ExternalLink href={`https://info.kwikswap.org/token/${kwik.address}`}>View KWIK Analytics</ExternalLink>
            ) : null}
          </AutoColumn>
        </CardSection>
      </ModalUpper>
    </ContentWrapper>
  )
}
